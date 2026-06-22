# Stack de Bots e Automações

Princípio:

```txt
Bot público para operação genérica.
Bot próprio para regra de negócio do Conecta.
```

## Recursos nativos do Discord

Usar primeiro o que o Discord já oferece:

- Community Onboarding;
- Server Guide;
- AutoMod;
- Forum Channels;
- Stage Channels;
- Scheduled Events;
- Roles e permissões nativas.

## Bots públicos a pesquisar

Tickets:

- Ticket Tool;
- Discord Tickets.

Moderação, logs e cargos:

- Sapphire;
- Dyno;
- Carl-bot.

Analytics:

- Statbot.

Eventos:

- Sesh;
- Apollo.

Voz temporária:

- VoiceMaster;
- TempVoice.

XP simples:

- Arcane.

Enquetes:

- EasyPoll;
- Simple Poll.

## Stack inicial recomendada

```txt
Discord nativo:
- Onboarding
- Server Guide
- AutoMod
- Fóruns
- Stage Channels
- Scheduled Events

Bots públicos:
- Ticket Tool ou Discord Tickets
- Sapphire ou Dyno ou Carl-bot
- Statbot
- Sesh ou Apollo
- VoiceMaster ou TempVoice
- EasyPoll ou Simple Poll

Bots próprios:
- Bot de Onboarding e Verificação
- Bot de Vagas
- Bot de Ranking
- Futuro Bot de Métricas Operacionais
- Automação de Pendências
```

## Bots próprios

### [[Bot de Onboarding e Verificação]]

Obrigatório desde a primeira versão. Deve validar aluno ou convidado, atribuir cargos e registrar entrada no banco.

### Bot de Vagas

Pode automatizar coleta, filtro e publicação de vagas. A operação fica conectada a [[Vagas e Oportunidades]].

### Bot de Ranking

Pode registrar pontuação, pódio, desafios vencidos e comandos como `/ranking`, `/meus-pontos` e `/top geral`.

### [[Automação de Pendências]]

Deve registrar status de tickets, responsáveis, prazos, alertas de SLA e comando `/pendencias`.

### Bot de Métricas Operacionais

Futuro bot ou integração para consolidar tickets, pendências, ranking, vagas, eventos e relatórios.

## Prioridade

1. [[Bot de Onboarding e Verificação]]
2. bot de tickets ou sistema de tickets
3. [[Automação de Pendências]]
4. bot de moderação/logs
5. bot de vagas
6. bot de ranking
7. bot de métricas operacionais

## Pendências

- escolher bots públicos finais;
- validar limites de plano gratuito;
- definir quais bots serão próprios;
- definir tecnologia e hospedagem dos bots próprios;
- definir integrações com banco do Conecta;
- definir nomes oficiais dos bots.

## Notas relacionadas

- [[Bot de Onboarding e Verificação]]
- [[Automação de Pendências]]
- [[Vagas e Oportunidades]]
- [[Desafios, Projetos e Ranking]]
- [[Métricas e Observabilidade]]
- [[Decisões Pendentes]]
