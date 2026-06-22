import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  ModalBuilder,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { supportCustomIds } from './custom-ids.js';

export const supportChannelName = '🎫・abrir-ticket';
export const supportTicketsCategoryName = '🎫 TICKETS ABERTOS';
export const adminRoleName = 'Admin';
export const monitorRoleName = 'Monitor';
export const supportLogChannelNames = ['📋-logs', '🧾-triagem-suporte', 'logs-verificacao'];
export const supportCategories = [
  {
    label: 'Dúvida técnica',
    emoji: '💻',
    value: 'technical',
    description: 'Ajuda com código, exercícios, erros e dúvidas técnicas.',
    channelPrefix: 'ticket-tecnico',
  },
  {
    label: 'Problema de acesso',
    emoji: '🔐',
    value: 'access',
    description: 'Problemas para acessar plataformas, contas ou materiais.',
    channelPrefix: 'ticket-acesso',
  },
  {
    label: 'Dúvida sobre aula/turma',
    emoji: '🎓',
    value: 'class',
    description: 'Dúvidas sobre aulas, horários, turmas ou reposições.',
    channelPrefix: 'ticket-aula',
  },
  {
    label: 'Problema com material',
    emoji: '📚',
    value: 'material',
    description: 'Problemas com apostilas, links, arquivos ou conteúdos.',
    channelPrefix: 'ticket-material',
  },
  {
    label: 'Certificado ou documentação',
    emoji: '📄',
    value: 'certificate',
    description: 'Ajuda com certificado, declaração ou documentação.',
    channelPrefix: 'ticket-certificado',
  },
  {
    label: 'Outro assunto',
    emoji: '❔',
    value: 'other',
    description: 'Quando nenhuma categoria anterior se encaixar.',
    channelPrefix: 'ticket-outro',
  },
];

export function buildSupportTicketMessage() {
  return {
    content: `🎫 **Abrir ticket de suporte**

Clique no botão abaixo para abrir um atendimento com a equipe do Conecta.

Use tickets para:

* dúvidas técnicas;
* problemas de acesso;
* dúvidas sobre aulas ou turmas;
* problemas com materiais;
* certificados ou documentação;
* outros assuntos que precisam de acompanhamento.

Depois de abrir o ticket, aguarde um monitor responder.`,
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(supportCustomIds.openButton)
          .setLabel('Abrir ticket')
          .setStyle(ButtonStyle.Primary),
      ),
    ],
  };
}

export function buildSupportCategorySelectMessage() {
  return {
    content: 'Qual tipo de suporte você precisa?',
    components: [
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(supportCustomIds.categorySelect)
          .setPlaceholder('Selecione uma categoria de suporte')
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions(
            supportCategories.map(category => (
              new StringSelectMenuOptionBuilder()
                .setLabel(category.label)
                .setEmoji(category.emoji)
                .setValue(category.value)
                .setDescription(category.description)
            )),
          ),
      ),
    ],
  };
}

export function buildSupportTicketModal(categoryValue) {
  const descriptionInput = new TextInputBuilder()
    .setCustomId(supportCustomIds.descriptionInput)
    .setLabel('Descrição do problema')
    .setPlaceholder('Explique o que aconteceu com o máximo de detalhes possível.')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)
    .setMinLength(10)
    .setMaxLength(1800);

  const noteInput = new TextInputBuilder()
    .setCustomId(supportCustomIds.noteInput)
    .setLabel('Print, link ou observação')
    .setPlaceholder('Opcional: envie link, print, aula relacionada ou outro detalhe útil.')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(false)
    .setMaxLength(1000);

  return new ModalBuilder()
    .setCustomId(`${supportCustomIds.modal}:${categoryValue}`)
    .setTitle('Abrir ticket de suporte')
    .addComponents(
      new ActionRowBuilder().addComponents(descriptionInput),
      new ActionRowBuilder().addComponents(noteInput),
    );
}

export async function ensureSupportTicketMessage(channel, clientUser, shouldApply) {
  if (!channel?.isTextBased?.() || !channel.messages?.fetch) {
    console.log(`! canal sem suporte a mensagem de ticket: ${channel?.name ?? 'desconhecido'}`);
    return;
  }

  const payload = buildSupportTicketMessage();
  const messages = await channel.messages.fetch({ limit: 50 });
  const existing = messages.find(message => (
    message.author.id === clientUser.id && hasSupportTicketButton(message)
  ));

  if (existing) {
    console.log(`= mensagem de abertura de ticket existente: ${channel.name}`);

    if (shouldApply) {
      await existing.edit(payload);
      await ensurePinned(existing);
    }

    return;
  }

  console.log(`+ mensagem de abertura de ticket: ${channel.name}`);

  if (!shouldApply) {
    return;
  }

  const message = await channel.send(payload);
  await ensurePinned(message);
}

export async function handleSupportInteraction(interaction) {
  if (interaction.isButton() && interaction.customId === supportCustomIds.openButton) {
    await interaction.reply({
      ...buildSupportCategorySelectMessage(),
      ephemeral: true,
    });
    return true;
  }

  if (interaction.isStringSelectMenu() && interaction.customId === supportCustomIds.categorySelect) {
    const category = findSupportCategory(interaction.values[0]);
    if (!category) {
      await interaction.reply({ content: 'Categoria de suporte inválida. Tente novamente.', ephemeral: true });
      return true;
    }

    await interaction.showModal(buildSupportTicketModal(category.value));
    return true;
  }

  if (interaction.isButton() && interaction.customId === supportCustomIds.closeButton) {
    await closeSupportTicket(interaction);
    return true;
  }

  if (!interaction.isModalSubmit() || !interaction.customId.startsWith(`${supportCustomIds.modal}:`)) {
    return false;
  }

  await interaction.deferReply({ ephemeral: true });

  const category = findSupportCategory(interaction.customId.split(':').at(-1));
  if (!category) {
    await interaction.editReply('Categoria de suporte inválida. Abra o ticket novamente.');
    return true;
  }

  const description = interaction.fields.getTextInputValue(supportCustomIds.descriptionInput).trim();
  const note = interaction.fields.getTextInputValue(supportCustomIds.noteInput).trim();
  const { channel, created } = await createSupportTicketChannel(interaction, { category, description, note });

  if (!created) {
    await interaction.editReply(`Você já tem um ticket aberto: ${channel}`);
    return true;
  }

  await interaction.editReply(`Ticket aberto: ${channel}`);
  await sendSupportLog(interaction.guild, [
    '**Ticket de suporte aberto**',
    `Aluno: ${interaction.user.tag} (${interaction.user.id})`,
    `Categoria: ${formatSupportCategory(category)}`,
    `Canal criado: ${channel.name} (${channel.id})`,
    `Data/hora: ${new Date().toISOString()}`,
    'Status: aberto',
  ]);

  return true;
}

async function createSupportTicketChannel(interaction, { category: supportCategory, description, note }) {
  const guild = interaction.guild;
  await guild.roles.fetch();
  await guild.channels.fetch();

  const ticketsCategory = findCategoryByName(guild, supportTicketsCategoryName);
  if (!ticketsCategory) {
    throw new Error(`Categoria obrigatória não encontrada: ${supportTicketsCategoryName}`);
  }

  const existingTicket = findOpenTicketByOwner(guild, ticketsCategory.id, interaction.user.id);
  if (existingTicket) {
    return { channel: existingTicket, created: false };
  }

  const monitorRole = findRoleByName(guild, monitorRoleName);
  const adminRole = findRoleByName(guild, adminRoleName);
  const ticketName = buildTicketChannelName(interaction.user, supportCategory);
  const permissionOverwrites = [
    deny(guild.roles.everyone.id, [PermissionFlagsBits.ViewChannel]),
    allow(interaction.user.id, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]),
    allow(monitorRole?.id, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]),
    allow(adminRole?.id, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageChannels]),
    allow(interaction.client.user.id, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageChannels]),
  ].filter(overwrite => Boolean(overwrite.id));

  const channel = await guild.channels.create({
    name: ticketName,
    type: ChannelType.GuildText,
    parent: ticketsCategory.id,
    topic: `Ticket de suporte Conecta | aluno=${interaction.user.id} | categoria=${supportCategory.value}`,
    permissionOverwrites,
    reason: `Ticket de suporte aberto por ${interaction.user.tag}`,
  });

  await channel.send({
    content: buildTicketOpeningContent({
      category: supportCategory,
      user: interaction.user,
      description,
      note,
    }),
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(supportCustomIds.closeButton)
          .setLabel('Fechar ticket')
          .setStyle(ButtonStyle.Danger),
      ),
    ],
  });

  return { channel, created: true };
}

async function closeSupportTicket(interaction) {
  await interaction.deferReply();

  const closer = await interaction.guild.members.fetch(interaction.user.id);
  const canClose = hasRole(closer, monitorRoleName)
    || hasRole(closer, adminRoleName)
    || isTicketOwner(interaction.channel, interaction.user.id);

  if (!canClose) {
    await interaction.editReply('Apenas Monitor, Admin ou o aluno que abriu o ticket podem fechar este ticket.');
    return;
  }

  await sendSupportLog(interaction.guild, [
    '**Ticket de suporte fechado**',
    `Usuário que fechou: ${interaction.user.tag} (${interaction.user.id})`,
    `Categoria: ${formatSupportCategory(findSupportCategory(extractSupportCategoryValue(interaction.channel))) ?? '-'}`,
    `Canal: ${interaction.channel?.name ?? 'desconhecido'} (${interaction.channelId})`,
    `Data/hora: ${new Date().toISOString()}`,
    'Status: fechado',
  ]);

  await interaction.editReply('Ticket encerrado. Este canal será deletado em alguns segundos.');
  setTimeout(() => {
    interaction.channel?.delete(`Ticket de suporte fechado por ${interaction.user.tag}`).catch(console.error);
  }, 5000);
}

async function sendSupportLog(guild, lines) {
  const channel = supportLogChannelNames
    .map(channelName => findTextChannelByName(guild, channelName))
    .find(candidate => candidate?.isTextBased?.());

  if (!channel) {
    console.warn('Canal de logs interno não encontrado para registrar ticket de suporte.');
    return;
  }

  await channel.send(lines.join('\n'));
}

function hasSupportTicketButton(message) {
  return message.components.some(row => (
    row.components.some(component => component.customId === supportCustomIds.openButton)
  ));
}

async function ensurePinned(message) {
  if (!message.pinned) {
    await message.pin('Mensagem fixa de abertura de ticket Conecta');
  }
}

function buildTicketChannelName(user, category) {
  const username = sanitizeChannelName(user.username);
  const shortId = user.id.slice(-6);
  return `${category.channelPrefix}-${username || 'aluno'}-${shortId}`.slice(0, 100);
}

function buildTicketOpeningContent({ category, user, description, note }) {
  const lines = [
    '🎫 **Ticket de suporte aberto**',
    '',
    `Categoria: ${formatSupportCategory(category)}`,
    `Aluno: ${user}`,
    '',
    'Descrição:',
    description,
  ];

  if (note) {
    lines.push('', 'Observação/link:', note);
  }

  lines.push('', 'Um monitor responderá assim que possível.');
  return lines.join('\n');
}

function sanitizeChannelName(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function isTicketOwner(channel, userId) {
  return channel?.topic?.includes(`aluno=${userId}`) ?? false;
}

function findOpenTicketByOwner(guild, categoryId, userId) {
  return guild.channels.cache.find(channel => (
    channel.type === ChannelType.GuildText
    && channel.parentId === categoryId
    && isTicketOwner(channel, userId)
  ));
}

function extractSupportCategoryValue(channel) {
  return channel?.topic?.match(/(?:^|\s\|\s)categoria=([^|]+)/)?.[1]?.trim();
}

function findSupportCategory(value) {
  return supportCategories.find(category => category.value === value);
}

function formatSupportCategory(category) {
  if (!category) {
    return undefined;
  }

  return `${category.emoji} ${category.label}`;
}

function hasRole(member, roleName) {
  return member.roles.cache.some(role => role.name === roleName);
}

function findRoleByName(guild, roleName) {
  return guild.roles.cache.find(role => role.name === roleName);
}

function findCategoryByName(guild, channelName) {
  return guild.channels.cache.find(channel => (
    channelNameMatches(channel.name, channelName) && channel.type === ChannelType.GuildCategory
  ));
}

function findTextChannelByName(guild, channelName) {
  return guild.channels.cache.find(channel => (
    channelNameMatches(channel.name, channelName) && channel.type === ChannelType.GuildText
  ));
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
