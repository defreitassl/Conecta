# Estrutura Final de Canais

Esta nota é a referência principal para montar o servidor Discord do Conecta.

Princípios:

- organizar o servidor por função;
- manter suporte individual em tickets;
- manter área acadêmica flexível;
- separar comunidade, projetos, vagas, desafios, equipe interna e logs;
- restringir áreas internas a Monitor e Admin;
- não criar áreas ou cargos específicos de Professor, Coordenação ou Direção na versão inicial.

## Categorias

```txt
1. Início
2. 📢 AVISOS OFICIAIS
3. Suporte e Dúvidas
4. Área Acadêmica Flexível
5. Aulas, Plantões e Eventos
6. Desenvolvimento em Grupo
7. Comunidade
8. Projetos e Talentos
9. Vagas e Oportunidades
10. Desafios e Ranking
11. Equipe Interna
12. Administração e Logs
```

## Versão resumida para apresentação

A apresentação HTML usa uma simulação mais compacta do Discord para explicar a estrutura sem listar todos os canais finais.

Categorias resumidas:

```txt
Entrada
📢 AVISOS OFICIAIS
Acadêmico
Suporte
Aulas e plantões
Comunidade e carreira
💬 COMUNIDADE GERAL
Equipe e logs
```

Canais destacados na apresentação:

```txt
#boas-vindas
#regras
#como-usar
#verificação
#📢・avisos-gerais
#🎓・avisos-das-turmas
#📅・calendario-e-eventos
fórum-materiais
fórum-turmas
fórum-módulos
#entregas
#abrir-ticket
fórum-base-de-dúvidas
#acesso
palco-aulas
sala-de-estudos
fórum-temas-plantões
#📍・primeiros-passos
#👋・apresente-se
#💬・chat-geral
#chat-geral
#apresentações
fórum-vagas
fórum-projetos-e-ranking
#monitores
#triagem-suporte
#logs
```

Essa lista é didática. A estrutura final pode continuar mais completa, desde que respeite os princípios de acesso, suporte, comunidade, projetos, equipe interna e logs.

## 1. Início

```txt
#boas-vindas
#regras
#como-usar-o-discord
#avisos-importantes
#verificação
```

Aluno não verificado deve ver apenas a área de entrada e iniciar a liberação pelo [[Bot de Onboarding e Verificação]].

## 2. 📢 AVISOS OFICIAIS

Esta seção formaliza a área antes descrita como `Anúncios e Informações`.

```txt
#📢・avisos-gerais
#🎓・avisos-das-turmas
#📅・calendario-e-eventos
```

Esta seção concentra a comunicação oficial do Conecta dentro do Discord. Ela separa comunicados importantes da conversa comum, evitando que informações institucionais, prazos e orientações se percam no chat geral.

Regra central:

```txt
Discord é a central principal de comunicação do Conecta.
WhatsApp fica apenas como apoio emergencial ou redirecionamento.
```

Alunos devem ver e ler os canais dessa categoria, mas não devem publicar mensagens. Publicação livre por alunos não deve ser permitida.

### #📢・avisos-gerais

Canal para comunicados oficiais do Conecta para todos os alunos.

Deve reunir:

- avisos institucionais;
- mudanças gerais;
- orientações importantes;
- comunicados amplos;
- reforços sobre o funcionamento oficial da comunidade.

### #🎓・avisos-das-turmas

Canal para comunicados ligados às turmas.

Pode incluir:

- avisos de aulas;
- reposições;
- materiais;
- prazos;
- lembretes;
- orientações dos Monitores.

### #📅・calendario-e-eventos

Canal para datas importantes e programação.

Pode incluir:

- plantões;
- desafios;
- eventos;
- encontros;
- mentorias;
- prazos.

### Permissões

```txt
Aguardando Verificação: não vê
Aluno Verificado: vê e lê, mas não envia mensagens
Monitor: vê e envia mensagens
Admin: acesso total
Convidado: não vê
Ex-Aluno: decisão futura
Silenciado / Restrito: pode ver se já for verificado, mas não envia mensagens
```

Referência da estrutura anterior:

```txt
📢 fórum-anúncios-conecta
#calendário-e-eventos
#novidades-do-conecta
#materiais-importantes
```

Esses itens ficam absorvidos pela nova organização de `📢 AVISOS OFICIAIS`, sem publicação livre por alunos.

## 3. Suporte e Dúvidas

```txt
#abrir-ticket
📚 fórum-base-de-conhecimento
💬 fórum-dúvidas-técnicas
💬 fórum-dúvidas-administrativas
💬 fórum-problemas-de-acesso
💬 fórum-dúvidas-sobre-aulas
```

Fluxo principal: [[Fluxo Detalhado de Suporte]]. A base deve ser alimentada a partir de dúvidas recorrentes e tickets.

### Atualização planejada: 🎫 SUPORTE

A área de suporte passa a ser formalizada como a categoria `🎫 SUPORTE`, com orientação antes da abertura de tickets e atendimento privado por bot.

```txt
🎫 SUPORTE
#📖・como-pedir-ajuda
#🎫・abrir-ticket
```

#### #📖・como-pedir-ajuda

Canal explicativo, preferencialmente somente leitura para alunos.

Deve orientar:

- como pedir ajuda corretamente;
- que suporte não deve ficar perdido no chat geral;
- que o aluno deve descrever bem o problema antes de abrir ticket;
- quais informações incluir: contexto, erro, aula/turma/material relacionado, o que já tentou e evidências como prints ou links.

#### #🎫・abrir-ticket

Canal de início do atendimento.

Deve conter mensagem fixa com botão:

```txt
Abrir ticket
```

O botão inicia o fluxo de abertura de ticket via bot.

Após o clique, o bot deve exibir um dropdown/select menu com categorias fixas. Depois da escolha da categoria, o bot abre o modal/formulário para descrição do problema.

#### Categoria dinâmica: 🎫 TICKETS ABERTOS

```txt
🎫 TICKETS ABERTOS
```

Categoria interna/dinâmica usada pelo bot para agrupar canais privados de tickets.

Cada ticket deve ser visível apenas para:

- aluno solicitante;
- Monitor;
- Admin;
- bot.

Outros alunos não devem conseguir ver tickets de terceiros.

#### Tipos de suporte V1

- 💻 Dúvida técnica;
- 🔐 Problema de acesso;
- 🎓 Dúvida sobre aula/turma;
- 📚 Problema com material;
- 📄 Certificado ou documentação;
- ❔ Outro assunto.

O tipo/categoria não deve ser digitado manualmente pelo aluno. A escolha deve acontecer por dropdown/select menu antes do modal, reduzindo erros de preenchimento e facilitando a identificação visual dos tickets pelos Monitores.

#### Modal V1

O modal não precisa pedir `tipo de suporte`, pois a categoria vem do dropdown.

Campos esperados:

- descrição do problema;
- print, link ou observação opcional, se viável.

#### Padrão de nomes dos tickets

```txt
ticket-tecnico-nome
ticket-acesso-nome
ticket-aula-nome
ticket-material-nome
ticket-certificado-nome
ticket-outro-nome
```

#### Fluxo planejado

```txt
1. Aluno acessa #🎫・abrir-ticket
2. Clica no botão "Abrir ticket"
3. Bot exibe um dropdown com as categorias de suporte
4. Aluno escolhe uma categoria
5. Bot abre um modal/formulário para o aluno descrever o problema
6. Bot cria um canal privado de ticket identificado pela categoria
7. Monitor responde
8. Ticket é fechado quando resolvido
```

#### Permissões

```txt
Aguardando Verificação: não vê a seção de suporte
Aluno Verificado: pode ver a seção de suporte e abrir tickets
Monitor: pode ver, responder e acompanhar tickets
Admin: acesso total
Convidado: não vê
Silenciado / Restrito: não deve enviar mensagens
Tickets privados: visíveis apenas para aluno solicitante, Monitor, Admin e bot
```

Detalhes completos: [[Seção SUPORTE]].

## 4. Área Acadêmica Flexível

```txt
#avisos-acadêmicos
#materiais-de-estudo
#entregas
#dúvidas-da-trilha
🔊 sala-da-trilha
```

Permanece pendente decidir se a organização será por turma, curso, módulo ou trilha.

## 5. Aulas, Plantões e Eventos

```txt
🎙 palco-aulões
🎙 palco-eventos
🔊 plantão-tira-dúvidas
🔊 sala-de-aula
🔊 mentoria
#agenda-de-plantões
💬 fórum-temas-plantões
```

Palcos devem ser usados para eventos maiores; canais de voz comuns devem ser usados para plantões, mentorias e interação direta.

O fórum de temas de plantões pode receber sugestões de alunos e dúvidas da semana para aprofundamento nos encontros ao vivo.

## 6. Desenvolvimento em Grupo

```txt
#formar-grupos
#procurando-grupo
#avisos-dos-grupos
🔊 dev-room-01
🔊 dev-room-02
🔊 dev-room-03
🔊 dev-room-04
🔊 dev-room-05
```

As salas podem ser fixas ou temporárias, decisão ainda pendente.

## 7. Comunidade

```txt
#chat-geral
#apresentações
#memes
#discussões-tech
#conquistas
#networking
```

Área mais livre, mas sujeita às regras de [[Regras Oficiais do Servidor]] e políticas de moderação.

## Categoria pós-verificação: 💬 COMUNIDADE GERAL

Esta categoria deve aparecer apenas depois que o aluno concluir a verificação e receber o cargo `Aluno Verificado`.

Objetivo:

- criar a primeira interação social do aluno no servidor;
- integrar alunos de diferentes turmas;
- fortalecer a sensação de comunidade logo após o onboarding;
- separar conversa geral de suporte formal.

### Canais

```txt
#📍・primeiros-passos
#👋・apresente-se
#💬・chat-geral
```

### #📍・primeiros-passos

Canal somente leitura para alunos verificados. Ele deve funcionar como o mapa inicial do aluno depois que a verificação for concluída.

Uso esperado:

- explicar o que fazer logo após a verificação;
- orientar o aluno a se apresentar em `#👋・apresente-se`;
- reforçar que avisos oficiais ficam em `#📢・avisos-gerais`, `#🎓・avisos-das-turmas` e `#📅・calendario-e-eventos`;
- orientar o uso de suporte e tickets para dúvidas e problemas;
- apontar caminhos para chat geral, plantões, desafios e projetos;
- deixar claro que o Discord é a central principal do Conecta;
- explicar que o WhatsApp fica apenas como apoio emergencial ou redirecionamento.

Ordem recomendada para o aluno:

```txt
1. Ler #📍・primeiros-passos
2. Ir para #👋・apresente-se
3. Acompanhar #📢・avisos-gerais, #🎓・avisos-das-turmas e #📅・calendario-e-eventos
4. Usar suporte/tickets para dúvidas e problemas
5. Participar de #💬・chat-geral, plantões, desafios e projetos
```

### #👋・apresente-se

Canal para a primeira apresentação do aluno após a verificação.

Uso esperado:

- o aluno deve ser direcionado para este canal depois de ler `#📍・primeiros-passos`;
- deve funcionar como primeira ação social antes de usar o restante da comunidade;
- deve ter um modelo simples para padronizar as apresentações.

Modelo de apresentação:

```txt
Nome:
Curso/Turma:
Cidade:
Nível atual em programação:
O que quer aprender no Conecta:
Uma curiosidade sobre você:
```

### #💬・chat-geral

Canal de conversa geral entre alunos de todas as turmas.

Serve para:

- integração entre alunos;
- troca de ideias;
- conversas leves;
- dúvidas rápidas;
- fortalecimento da comunidade.

Regra importante:

```txt
Dúvidas formais de suporte continuam indo para tickets ou canais específicos.
```

### Permissões

```txt
Aguardando Verificação: não vê a categoria
Aluno Verificado: vê #📍・primeiros-passos e lê, mas não escreve; vê e envia mensagens em #👋・apresente-se e #💬・chat-geral
Monitor: vê, escreve e pode gerenciar mensagens
Admin: acesso total
Convidado: não vê por enquanto
Ex-Aluno: decisão futura
Silenciado / Restrito: não deve enviar mensagens
```

## 8. Projetos e Talentos

```txt
🧩 fórum-projetos-dos-alunos
🌟 fórum-mural-de-talentos
🏆 fórum-projetos-vencedores
#feedback-de-projetos
```

Usar para portfólio, destaque de alunos, feedback e projetos vencedores.

## 9. Vagas e Oportunidades

```txt
💼 fórum-vagas
#vagas-automaticas
#vagas-parceiras
#eventos-externos
#dicas-de-carreira
#projetos-reais
```

Detalhes ficam em [[Vagas e Oportunidades]].

## 10. Desafios e Ranking

```txt
#desafios-ativos
#regras-dos-desafios
#entregas-dos-desafios
#briefings-simulados
#ranking
#vencedores
#certificados-e-premiações
```

Detalhes ficam em [[Desafios, Projetos e Ranking]].

## 11. Equipe Interna

```txt
#monitores
#triagem-suporte
#avisos-internos
#planejamento
🔊 call-monitores
🔊 call-equipe
```

Categoria privada para Monitor e Admin.

## 12. Administração e Logs

```txt
#admin
#logs-moderação
#logs-tickets
#logs-cargos
#logs-bots
#logs-entrada-saída
#relatórios
```

Categoria privada, principalmente para Admin. Logs sensíveis não devem ficar visíveis para alunos.

## Notas relacionadas

- [[Cargos e Hierarquia]]
- [[Decisões Pendentes]]
