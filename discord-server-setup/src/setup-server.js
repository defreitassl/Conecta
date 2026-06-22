import 'dotenv/config';
import { ChannelType, Client, GatewayIntentBits } from 'discord.js';
import { categories, permissionProfiles, roles } from '../config/server-structure.js';
import {
  ensureVerificationLogChannel,
  ensureVerificationMessage,
  verificationChannelName,
} from './verification/discord-flow.js';
import {
  ensureSupportTicketMessage,
  supportChannelName,
} from './support/discord-flow.js';

const shouldApply = process.argv.includes('--apply');
const token = process.env.DISCORD_TOKEN;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !guildId) {
  console.error('Configure DISCORD_TOKEN e DISCORD_GUILD_ID no arquivo .env antes de rodar.');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('clientReady', async () => {
  try {
    const guild = await client.guilds.fetch(guildId);
    await guild.roles.fetch();
    await guild.channels.fetch();

    console.log(`Servidor: ${guild.name}`);
    console.log(`Modo: ${shouldApply ? 'APLICAR ALTERAÇÕES' : 'PLANO / DRY RUN'}`);

    const roleMap = await ensureRoles(guild);
    await ensureCategoriesAndChannels(guild, roleMap);
    await ensureVerificationLogChannel(guild, roleMap, shouldApply);
    await ensureVerificationEntryPoint(guild);
    await ensureSupportEntryPoint(guild);

    console.log('Setup concluído.');
  } catch (error) {
    console.error('Falha no setup:', error);
    process.exitCode = 1;
  } finally {
    client.destroy();
  }
});

client.login(token);

async function ensureRoles(guild) {
  const roleMap = {};

  for (const roleConfig of roles) {
    const existing = guild.roles.cache.find(role => role.name === roleConfig.name);

    if (existing) {
      roleMap[roleConfig.key] = existing.id;
      console.log(`= cargo existente: ${roleConfig.name}`);
      continue;
    }

    console.warn(`! cargo não encontrado, não será criado automaticamente: ${roleConfig.name}`);
  }

  return roleMap;
}

async function ensureCategoriesAndChannels(guild, roleMap) {
  const everyone = guild.roles.everyone.id;
  const overwriteContext = { everyone, roleMap };

  for (const categoryConfig of categories) {
    const categoryOverwrites = cleanOverwrites(permissionProfiles[categoryConfig.profile](overwriteContext));
    const category = await ensureChannel(guild, {
      name: categoryConfig.name,
      type: ChannelType.GuildCategory,
      permissionOverwrites: categoryOverwrites,
      reason: 'Setup inicial do servidor Discord Conecta',
    });

    for (const channelConfig of categoryConfig.channels) {
      const channelProfile = channelConfig.profile ?? categoryConfig.profile;
      const channelOverwrites = channelConfig.profile
        ? cleanOverwrites(permissionProfiles[channelProfile](overwriteContext))
        : undefined;
      const channelType = resolveChannelType(guild, channelConfig.type);

      const channel = await ensureChannel(guild, {
        name: channelConfig.name,
        type: channelType,
        parent: category?.id,
        bitrate: supportsBitrate(channelType) ? 64000 : undefined,
        topic: supportsTopic(channelType) ? channelConfig.topic : undefined,
        permissionOverwrites: channelOverwrites,
        reason: 'Setup inicial do servidor Discord Conecta',
      });

      await ensureInitialMessage(channel, channelConfig.initialMessage, channelConfig.pinInitialMessage);
    }
  }
}

async function ensureChannel(guild, options) {
  const existing = guild.channels.cache.find(channel => {
    const sameName = channelNameMatches(channel.name, options.name);
    const sameType = channel.type === options.type;
    const sameParent = options.parent ? channel.parentId === options.parent : true;
    return sameName && sameType && sameParent;
  });

  if (existing) {
    if (existing.name !== options.name) {
      console.log(`~ renomear canal: ${existing.name} -> ${options.name}`);

      if (shouldApply) {
        await existing.edit({
          name: options.name,
          reason: options.reason,
        });
      }
    }

    if (shouldApply && options.permissionOverwrites) {
      await existing.permissionOverwrites.set(options.permissionOverwrites, options.reason);
    }

    if (shouldApply && supportsTopic(options.type) && options.topic && existing.topic !== options.topic) {
      await existing.edit({
        topic: options.topic,
        reason: options.reason,
      });
    }

    console.log(`= canal existente: ${channelLabel(options)}`);
    return existing;
  }

  console.log(`+ canal: ${channelLabel(options)}`);

  if (!shouldApply) {
    return { id: `dry-run-channel-${slug(options.name)}` };
  }

  return guild.channels.create(options);
}

async function ensureVerificationEntryPoint(guild) {
  const channel = guild.channels.cache.find(existingChannel => (
    channelNameMatches(existingChannel.name, verificationChannelName)
    && existingChannel.type === ChannelType.GuildText
  ));

  if (!channel) {
    console.warn(`! canal de verificação não encontrado: ${verificationChannelName}`);
    return;
  }

  await ensureVerificationMessage(channel, client.user, shouldApply);
}

async function ensureSupportEntryPoint(guild) {
  const channel = guild.channels.cache.find(existingChannel => (
    channelNameMatches(existingChannel.name, supportChannelName)
    && existingChannel.type === ChannelType.GuildText
  ));

  if (!channel) {
    console.warn(`! canal de abertura de ticket não encontrado: ${supportChannelName}`);
    return;
  }

  await ensureSupportTicketMessage(channel, client.user, shouldApply);
}

async function ensureInitialMessage(channel, content, shouldPin = false) {
  if (!content || !channel?.isTextBased?.()) {
    return;
  }

  if (!channel.messages?.fetch) {
    console.log(`+ mensagem inicial: ${channel.name}`);
    return;
  }

  const messages = await channel.messages.fetch({ limit: 50 });
  const existingMessage = messages.find(message => (
    message.author.id === client.user.id && message.content === content
  ));

  if (existingMessage) {
    console.log(`= mensagem inicial existente: ${channel.name}`);
    if (shouldApply && shouldPin) {
      await ensurePinned(existingMessage);
    }
    return;
  }

  console.log(`+ mensagem inicial: ${channel.name}`);

  if (!shouldApply) {
    return;
  }

  const message = await channel.send(content);
  if (shouldPin) {
    await ensurePinned(message);
  }
}

async function ensurePinned(message) {
  if (!message.pinned) {
    await message.pin('Mensagem inicial fixa do servidor Conecta');
  }
}

function channelNameMatches(existingName, targetName) {
  return normalizeChannelName(existingName) === normalizeChannelName(targetName);
}

function stripDecorativePrefix(value) {
  return value.replace(/^[^\p{L}\p{N}]+/u, '');
}

function normalizeChannelName(value) {
  return stripDecorativePrefix(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function resolveChannelType(guild, type) {
  if (type === ChannelType.GuildStageVoice && !guild.features.includes('COMMUNITY')) {
    console.warn('! servidor sem recurso COMMUNITY: criando canal de voz no lugar de canal de palco');
    return ChannelType.GuildVoice;
  }

  return type;
}

function supportsTopic(type) {
  return [
    ChannelType.GuildText,
    ChannelType.GuildAnnouncement,
    ChannelType.GuildForum,
    ChannelType.GuildMedia,
  ].includes(type);
}

function supportsBitrate(type) {
  return [
    ChannelType.GuildVoice,
    ChannelType.GuildStageVoice,
  ].includes(type);
}

function channelLabel({ name, type }) {
  return `${name} (${channelTypeName(type)})`;
}

function channelTypeName(type) {
  const names = {
    [ChannelType.GuildCategory]: 'categoria',
    [ChannelType.GuildText]: 'texto',
    [ChannelType.GuildForum]: 'fórum',
    [ChannelType.GuildVoice]: 'voz',
    [ChannelType.GuildStageVoice]: 'palco',
  };

  return names[type] ?? String(type);
}

function cleanOverwrites(overwrites) {
  return overwrites.filter(overwrite => Boolean(overwrite.id));
}

function slug(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
