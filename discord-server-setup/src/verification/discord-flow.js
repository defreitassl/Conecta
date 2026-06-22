import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  ModalBuilder,
  PermissionFlagsBits,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { verificationCustomIds } from './custom-ids.js';

export const verificationChannelName = '✅-verificação';
export const verificationLogChannelName = 'logs-verificacao';
export const pendingRoleName = 'Aguardando Verificação';
export const verifiedRoleName = 'Aluno Verificado';
export const adminRoleName = 'Admin';
export const monitorRoleName = 'Monitor';
const genericVerificationFailureMessage = 'Não conseguimos validar seus dados. Confira matrícula e e-mail cadastrado e tente novamente. Se o problema continuar, procure a equipe do Conecta.';

export function buildVerificationMessage() {
  return {
    content: [
      '**Verificação de aluno Conecta**',
      '',
      'Clique em **Iniciar verificação** e informe sua matrícula e o e-mail cadastrado no Conecta.',
      'A resposta aparece apenas para você.',
    ].join('\n'),
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(verificationCustomIds.startButton)
          .setLabel('Iniciar verificação')
          .setStyle(ButtonStyle.Primary),
      ),
    ],
  };
}

export function buildVerificationModal() {
  const enrollmentInput = new TextInputBuilder()
    .setCustomId(verificationCustomIds.enrollmentInput)
    .setLabel('Número de matrícula')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMaxLength(64);

  const emailInput = new TextInputBuilder()
    .setCustomId(verificationCustomIds.emailInput)
    .setLabel('E-mail cadastrado no Conecta')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMaxLength(254);

  return new ModalBuilder()
    .setCustomId(verificationCustomIds.modal)
    .setTitle('Verificação Conecta')
    .addComponents(
      new ActionRowBuilder().addComponents(enrollmentInput),
      new ActionRowBuilder().addComponents(emailInput),
    );
}

export async function ensureVerificationMessage(channel, clientUser, shouldApply) {
  if (!channel?.isTextBased?.() || !channel.messages?.fetch) {
    console.log(`! canal sem suporte a mensagem de verificação: ${channel?.name ?? 'desconhecido'}`);
    return;
  }

  const payload = buildVerificationMessage();
  const messages = await channel.messages.fetch({ limit: 50 });
  const existing = messages.find(message => (
    message.author.id === clientUser.id && hasVerificationButton(message)
  ));

  if (existing) {
    console.log(`= mensagem de verificação existente: ${channel.name}`);

    if (shouldApply) {
      await existing.edit(payload);
      await ensurePinned(existing);
    }

    return;
  }

  console.log(`+ mensagem de verificação: ${channel.name}`);

  if (!shouldApply) {
    return;
  }

  const message = await channel.send(payload);
  await ensurePinned(message);
}

export async function ensureVerificationLogChannel(guild, roleMap, shouldApply) {
  const existing = guild.channels.cache.find(channel => (
    channelNameMatches(channel.name, verificationLogChannelName)
    && channel.type === ChannelType.GuildText
  ));

  if (existing) {
    console.log(`= canal existente: ${existing.name} (texto)`);

    if (shouldApply) {
      await existing.permissionOverwrites.set(
        teamOnlyOverwrites(guild, roleMap),
        'Garantir privacidade dos logs de verificação Conecta',
      );
    }

    return existing;
  }

  const parent = guild.channels.cache.find(channel => (
    channel.type === ChannelType.GuildCategory
    && channelNameMatches(channel.name, '🛠️ Equipe e logs')
  ));

  console.log(`+ canal: ${verificationLogChannelName} (texto)`);

  if (!shouldApply) {
    return { id: 'dry-run-channel-logs-verificacao', name: verificationLogChannelName };
  }

  return guild.channels.create({
    name: verificationLogChannelName,
    type: ChannelType.GuildText,
    parent: parent?.id,
    topic: 'Logs do fluxo de verificação automática de alunos.',
    permissionOverwrites: teamOnlyOverwrites(guild, roleMap),
    reason: 'Setup do fluxo de verificação Conecta',
  });
}

export async function handleVerificationInteraction(interaction, provider) {
  if (interaction.isButton() && interaction.customId === verificationCustomIds.startButton) {
    await interaction.showModal(buildVerificationModal());
    return true;
  }

  if (!interaction.isModalSubmit() || interaction.customId !== verificationCustomIds.modal) {
    return false;
  }

  await interaction.deferReply({ ephemeral: true });

  const enrollment = interaction.fields.getTextInputValue(verificationCustomIds.enrollmentInput);
  const email = interaction.fields.getTextInputValue(verificationCustomIds.emailInput);
  const verification = await provider.verifyStudent({
    enrollment,
    email,
    discordUserId: interaction.user.id,
  });

  if (verification.approved) {
    await applyApprovedRoles(interaction);
    await interaction.editReply([
      'Verificação concluída. Seu acesso de aluno foi liberado.',
      'Agora acesse primeiro #📍・primeiros-passos e depois vá para #👋・apresente-se para se apresentar à comunidade.',
    ].join('\n'));
  } else {
    await interaction.editReply(genericVerificationFailureMessage);
  }

  await sendVerificationLog(interaction, {
    enrollment,
    email,
    result: verification.result ?? (verification.approved ? 'aprovado' : 'recusado'),
    reason: verification.reason,
  });

  return true;
}

async function applyApprovedRoles(interaction) {
  const guild = interaction.guild;
  const member = await guild.members.fetch(interaction.user.id);
  const pendingRole = findRoleByName(guild, pendingRoleName);
  const verifiedRole = findRoleByName(guild, verifiedRoleName);

  if (!verifiedRole) {
    throw new Error(`Cargo obrigatório não encontrado: ${verifiedRoleName}`);
  }

  if (pendingRole && member.roles.cache.has(pendingRole.id)) {
    await member.roles.remove(pendingRole, 'Aluno aprovado na verificação Conecta');
  }

  if (!member.roles.cache.has(verifiedRole.id)) {
    await member.roles.add(verifiedRole, 'Aluno aprovado na verificação Conecta');
  }
}

async function sendVerificationLog(interaction, { enrollment, email, result, reason }) {
  const channel = findTextChannelByName(interaction.guild, verificationLogChannelName);

  if (!channel?.isTextBased?.()) {
    console.warn(`Canal de logs não encontrado: ${verificationLogChannelName}`);
    return;
  }

  await channel.send([
    '**Verificação de aluno**',
    `Usuário Discord: ${interaction.user.tag} (${interaction.user.id})`,
    `Matrícula informada: ${enrollment}`,
    `E-mail informado: ${maskEmail(email)}`,
    `Resultado: ${result}`,
    `Motivo da recusa: ${reason ?? '-'}`,
    `Data/hora: ${new Date().toISOString()}`,
  ].join('\n'));
}

function hasVerificationButton(message) {
  return message.components.some(row => (
    row.components.some(component => component.customId === verificationCustomIds.startButton)
  ));
}

async function ensurePinned(message) {
  if (!message.pinned) {
    await message.pin('Mensagem fixa de verificação Conecta');
  }
}

function teamOnlyOverwrites(guild, roleMap) {
  return [
    deny(guild.roles.everyone.id, [PermissionFlagsBits.ViewChannel]),
    allow(roleMap.monitor, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.admin, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageChannels]),
  ].filter(overwrite => Boolean(overwrite.id));
}

function findRoleByName(guild, roleName) {
  return guild.roles.cache.find(role => role.name === roleName);
}

function findTextChannelByName(guild, channelName) {
  return guild.channels.cache.find(channel => (
    channelNameMatches(channel.name, channelName) && channel.type === ChannelType.GuildText
  ));
}

function maskEmail(email) {
  const [localPart, domain] = String(email ?? '').trim().split('@');

  if (!localPart || !domain) {
    return '[email inválido]';
  }

  return `${localPart.slice(0, 2)}***@${domain}`;
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

function allow(id, allowPermissions) {
  return { id, allow: allowPermissions };
}

function deny(id, denyPermissions) {
  return { id, deny: denyPermissions };
}
