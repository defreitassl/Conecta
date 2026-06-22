import { ChannelType, PermissionFlagsBits } from 'discord.js';

export const roles = [
  {
    key: 'admin',
    name: 'Admin',
    color: '#ef4444',
    hoist: true,
    mentionable: false,
  },
  {
    key: 'monitor',
    name: 'Monitor',
    color: '#22c55e',
    hoist: true,
    mentionable: true,
  },
  {
    key: 'student',
    name: 'Aluno Verificado',
    color: '#3b82f6',
    hoist: false,
    mentionable: false,
  },
  {
    key: 'pending',
    name: 'Aguardando Verificação',
    color: '#94a3b8',
    hoist: false,
    mentionable: false,
  },
  {
    key: 'alumni',
    name: 'Ex-Aluno',
    color: '#64748b',
    hoist: false,
    mentionable: false,
  },
  {
    key: 'guest',
    name: 'Convidado',
    color: '#f59e0b',
    hoist: false,
    mentionable: false,
  },
  {
    key: 'restricted',
    name: 'Silenciado / Restrito',
    color: '#71717a',
    hoist: false,
    mentionable: false,
  },
  {
    key: 'superModuleTemplate',
    name: 'Super Módulo - Template',
    color: '#8b5cf6',
    hoist: false,
    mentionable: false,
  },
];

export const permissionProfiles = {
  entry: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.SendMessages]),
    allow(roleMap.pending, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.student, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.guest, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.monitor, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages]),
    allow(roleMap.admin, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels]),
  ],
  verifiedStudents: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    allow(roleMap.student, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.CreatePublicThreads,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.Connect,
    ]),
    allow(roleMap.alumni, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.CreatePublicThreads,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.Connect,
    ]),
    allow(roleMap.monitor, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.CreatePublicThreads,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.Connect,
    ]),
    allow(roleMap.admin, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.CreatePublicThreads,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.ManageChannels,
      PermissionFlagsBits.Connect,
    ]),
  ],
  readOnlyStudents: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    allow(roleMap.student, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.alumni, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.guest, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.monitor, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.CreatePublicThreads,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.ManageMessages,
    ]),
    allow(roleMap.admin, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.CreatePublicThreads,
      PermissionFlagsBits.SendMessagesInThreads,
      PermissionFlagsBits.ManageChannels,
    ]),
  ],
  communityGeneral: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.pending, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.guest, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.restricted, [PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.SendMessagesInThreads]),
    allow(roleMap.student, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
    ]),
    allow(roleMap.monitor, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
    ]),
    allow(roleMap.admin, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ManageChannels,
    ]),
  ],
  firstSteps: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.pending, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.guest, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.alumni, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.restricted, [PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.SendMessagesInThreads]),
    allow(roleMap.student, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.monitor, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
    ]),
    allow(roleMap.admin, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ManageChannels,
    ]),
  ],
  officialAnnouncements: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.pending, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.guest, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.alumni, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.restricted, [PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.SendMessagesInThreads]),
    allow(roleMap.student, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.monitor, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
    ]),
    allow(roleMap.admin, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ManageChannels,
    ]),
  ],
  supportReadOnly: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.pending, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.guest, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.alumni, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.restricted, [PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.SendMessagesInThreads]),
    allow(roleMap.student, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.monitor, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
    ]),
    allow(roleMap.admin, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ManageChannels,
    ]),
  ],
  supportOpenTicket: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]),
    deny(roleMap.pending, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.guest, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.alumni, [PermissionFlagsBits.ViewChannel]),
    deny(roleMap.restricted, [PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.SendMessagesInThreads]),
    allow(roleMap.student, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.monitor, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
    ]),
    allow(roleMap.admin, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ManageChannels,
    ]),
  ],
  supportTickets: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    allow(roleMap.monitor, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.admin, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageChannels]),
  ],
  teamOnly: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    allow(roleMap.monitor, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.admin, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels]),
  ],
  superModuleTemplate: ({ everyone, roleMap }) => [
    deny(everyone, [PermissionFlagsBits.ViewChannel]),
    allow(roleMap.superModuleTemplate, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.Connect, PermissionFlagsBits.ReadMessageHistory]),
    allow(roleMap.monitor, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.Connect, PermissionFlagsBits.ManageMessages]),
    allow(roleMap.admin, [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.Connect, PermissionFlagsBits.ManageChannels]),
  ],
};

export const categories = [
  {
    name: '👋 Entrada',
    profile: 'entry',
    channels: [
      text('👋-boas-vindas', 'Primeira mensagem do servidor, com orientação inicial, próximos passos e links principais.'),
      text('📜-regras', 'Regras de convivência, uso correto dos canais, condutas proibidas e critérios de moderação.'),
      text('🧭-como-usar', 'Guia rápido para navegar no servidor, abrir tickets, entrar em plantões e encontrar materiais.'),
      text('✅-verificação', 'Canal usado para orientar a verificação do aluno antes da liberação dos cargos e canais internos.'),
    ],
  },
  {
    name: '📢 Avisos',
    profile: 'readOnlyStudents',
    channels: [
      forum('📢-anúncios', 'Comunicados oficiais do Conecta organizados por publicação.'),
      text('📅-calendário', 'Datas importantes: aulas, plantões, eventos, prazos, desafios e Super Módulos.'),
      forum('📚-materiais', 'Materiais, links, documentos e conteúdos de apoio importantes.'),
    ],
  },
  {
    name: '📢 AVISOS OFICIAIS',
    profile: 'officialAnnouncements',
    channels: [
      text(
        '📢・avisos-gerais',
        'Comunicados oficiais do Conecta para todos os alunos.',
        `📢 **Avisos gerais do Conecta**

Este canal reúne os comunicados oficiais do Conecta para todos os alunos.

Fique atento às mensagens publicadas aqui. Informações importantes sobre o funcionamento do projeto, mudanças, orientações gerais e comunicados institucionais serão enviadas por este canal.

O Discord é a central principal de comunicação do Conecta. O WhatsApp será usado apenas como apoio emergencial ou redirecionamento.`,
        undefined,
        { pinInitialMessage: true },
      ),
      text(
        '🎓・avisos-das-turmas',
        'Comunicados relacionados às turmas, aulas, materiais, prazos e orientações dos monitores.',
        `🎓 **Avisos das turmas**

Este canal será usado para comunicados relacionados às turmas, aulas, materiais, prazos, reposições e orientações dos monitores.

Sempre acompanhe este canal para não perder informações importantes sobre sua jornada no Conecta.`,
        undefined,
        { pinInitialMessage: true },
      ),
      text(
        '📅・calendario-e-eventos',
        'Datas importantes, plantões, desafios, eventos, encontros, mentorias e prazos do Conecta.',
        `📅 **Calendário e eventos**

Este canal reúne datas importantes, plantões, desafios, eventos, encontros, mentorias e prazos do Conecta.

Use este canal como referência para acompanhar o que está acontecendo e o que está por vir.`,
        undefined,
        { pinInitialMessage: true },
      ),
    ],
  },
  {
    name: '🎓 Acadêmico',
    profile: 'verifiedStudents',
    channels: [
      forum('🎓-turmas', 'Avisos acadêmicos, acompanhamento e dúvidas específicas por turma.'),
      forum('🧩-módulos', 'Organização de módulos, trilhas e Super Módulos ativos.'),
      text('📤-entregas', 'Orientações sobre prazos, critérios e links para atividades e projetos.'),
    ],
  },
  {
    name: '🎫 SUPORTE',
    profile: 'supportReadOnly',
    channels: [
      text(
        '📖・como-pedir-ajuda',
        'Orientações para alunos pedirem ajuda com contexto e usarem os tickets corretamente.',
        `📖 **Como pedir ajuda no Conecta**

Use o suporte sempre que precisar de ajuda com dúvidas técnicas, problemas de acesso, aulas, materiais, certificados ou outros assuntos relacionados à sua jornada no Conecta.

Antes de abrir um ticket, tente descrever bem o problema:

* O que você estava tentando fazer?
* O que deu errado?
* Apareceu alguma mensagem de erro?
* Você tem print ou link para enviar?
* Qual aula, turma ou atividade está relacionada?

Evite pedir suporte no chat geral. O chat geral é para conversa e interação da comunidade.

Para suporte, use o canal \`#🎫・abrir-ticket\`.`,
        'supportReadOnly',
        { pinInitialMessage: true },
      ),
      text(
        '🎫・abrir-ticket',
        'Canal para abrir tickets privados de suporte com a equipe do Conecta.',
        undefined,
        'supportOpenTicket',
      ),
    ],
  },
  {
    name: '🎫 TICKETS ABERTOS',
    profile: 'supportTickets',
    channels: [],
  },
  {
    name: '🎙️ Aulas e plantões',
    profile: 'verifiedStudents',
    channels: [
      stage('🎙️-palco-aulas', 'Palco para aulas, aulões, plantões e encontros organizados.'),
      voice('🔊-sala-de-estudos', 'Sala de voz para estudos em grupo, prática orientada e discussões rápidas.'),
      forum('❓-temas-plantões', 'Sugestões de temas e dúvidas para aprofundar nos plantões semanais.'),
    ],
  },
  {
    name: '🤝 Comunidade e carreira',
    profile: 'verifiedStudents',
    channels: [
      text('💬-chat-geral', 'Conversa geral, networking e troca de experiências entre alunos.'),
      text('🙋-apresentações', 'Apresentação de novos alunos, objetivos e interesses.'),
      forum('💼-vagas', 'Vagas, oportunidades, projetos externos, eventos e conteúdos de carreira.'),
      forum('🏆-projetos-e-ranking', 'Projetos opcionais, desafios, entregas, destaques e ranking.'),
    ],
  },
  {
    name: '💬 COMUNIDADE GERAL',
    profile: 'communityGeneral',
    channels: [
      text(
        '📍・primeiros-passos',
        'Orientação inicial para alunos verificados começarem no Discord do Conecta.',
        `📍 **Primeiros passos no Discord do Conecta**

Bem-vindo(a) ao ambiente oficial do Conecta.

A partir de agora, este Discord será o principal lugar para acompanhar avisos, pedir suporte, participar dos plantões, interagir com outros alunos, acessar desafios e acompanhar sua jornada.

Para começar, siga esta ordem:

**1. Apresente-se**
Vá até o canal \`#👋・apresente-se\` e conte um pouco sobre você.

**2. Acompanhe os avisos**
Fique atento aos canais de avisos oficiais. Informações importantes sobre aulas, plantões, eventos e comunicados serão publicadas por lá.

**3. Use o suporte do jeito certo**
Quando tiver problemas de acesso, dúvidas técnicas ou precisar de ajuda, use os canais oficiais de suporte/tickets. Evite pedir suporte perdido no chat geral.

**4. Participe da comunidade**
Use o \`#💬・chat-geral\` para conversar, trocar ideias, conhecer outros alunos e compartilhar experiências.

**5. Participe dos plantões e desafios**
Sempre que houver plantões, desafios ou projetos, participe. Essa será uma das principais formas de evoluir dentro do Conecta.

**Importante:** o WhatsApp será usado apenas como apoio emergencial ou redirecionamento. O Discord é a central principal do Conecta.`,
        'firstSteps',
        { pinInitialMessage: true },
      ),
      text(
        '👋・apresente-se',
        'Canal para novos alunos verificados se apresentarem para a comunidade.',
        `👋 Bem-vindo(a) ao Conecta!

Agora que você já foi verificado, este é o seu primeiro passo dentro da comunidade.

Apresente-se usando o modelo abaixo:

Nome:
Curso/Turma:
Cidade:
Nível atual em programação:
O que quer aprender no Conecta:
Uma curiosidade sobre você:`,
      ),
      text(
        '💬・chat-geral',
        'Chat geral para alunos verificados conversarem e interagirem com a comunidade.',
        `💬 Este é o chat geral do Conecta.

Aqui os alunos de todas as turmas podem conversar, trocar ideias, compartilhar experiências e interagir com a comunidade.

Para pedidos de suporte, problemas técnicos ou dúvidas que precisam de acompanhamento, use os canais oficiais de suporte/tickets.`,
      ),
    ],
  },
  {
    name: '🚀 Super Módulo - Template',
    profile: 'superModuleTemplate',
    channels: [
      stage('🎙️-palco-super-módulo', 'Palco para aulas ao vivo do Super Módulo.'),
      forum('📢-avisos-super-módulo', 'Avisos, materiais e orientações específicas do Super Módulo.'),
      forum('❓-tira-dúvidas-super-módulo', 'Dúvidas dos alunos matriculados no Super Módulo.'),
      forum('🚀-projetos-super-módulo', 'Briefings, entregas e acompanhamento dos projetos do Super Módulo.'),
      voice('🔊-grupo-super-módulo', 'Sala de voz para grupos, prática e colaboração.'),
    ],
  },
  {
    name: '🛠️ Equipe e logs',
    profile: 'teamOnly',
    channels: [
      text('🧑‍🏫-monitores', 'Alinhamento dos monitores, plantões, dúvidas recorrentes e rotina de suporte.'),
      text('🧾-triagem-suporte', 'Acompanhamento de tickets, escalonamentos, pendências e casos sensíveis.'),
      text('📋-logs', 'Logs de tickets, bots, cargos, moderação e ações sensíveis do servidor.'),
    ],
  },
];

function text(name, topic, initialMessage, profile, options = {}) {
  const resolvedOptions = typeof profile === 'object' && profile !== null ? profile : options;
  const resolvedProfile = typeof profile === 'string' ? profile : undefined;

  return {
    name,
    type: ChannelType.GuildText,
    topic,
    initialMessage,
    profile: resolvedProfile,
    ...resolvedOptions,
  };
}

function forum(name, topic, profile) {
  return { name, type: ChannelType.GuildForum, topic, profile };
}

function voice(name, topic) {
  return { name, type: ChannelType.GuildVoice, topic };
}

function stage(name, topic) {
  return { name, type: ChannelType.GuildStageVoice, topic };
}

function allow(id, allowPermissions) {
  return { id, allow: allowPermissions };
}

function deny(id, denyPermissions) {
  return { id, deny: denyPermissions };
}
