# Decisões Pendentes

Esta nota centraliza apenas decisões estruturais ainda abertas. Pendências operacionais do dia a dia devem ficar em [[Pendências Operacionais]] e, sempre que possível, ser automatizadas.

## Estrutura do servidor

- definir quais categorias e canais entram na primeira versão;
- confirmar se a área acadêmica será por turma, curso, módulo ou trilha;
- definir se salas de desenvolvimento em grupo serão fixas, temporárias ou modelo flexível;
- decidir se materiais e entregas ficam no Discord ou em sistema externo;
- definir permissões finais por cargo e por área crítica.

## Cargos e acesso

- definir nomes finais dos cargos;
- definir se haverá nomes descontraídos ligados à identidade do Conecta;
- definir acesso de Ex-Aluno;
- definir se Ex-Aluno poderá acessar a categoria `💬 COMUNIDADE GERAL`;
- definir uso recorrente ou pontual do cargo Convidado;
- definir segmentações por curso, turma, cidade, stack ou nível;
- definir permissões finais de Monitor para timeout, apagar mensagens e visualizar logs.

## Onboarding e verificação

Decisão tomada:

- o fluxo inicial de verificação do aluno foi implementado com sucesso em modo mock;
- o bot já exibe botão de verificação, abre modal e coleta matrícula/e-mail;
- a aprovação ou recusa inicial é simulada por `MockVerificationProvider`;
- a verificação ideal de aluno será automática via API interna do Conecta;
- o bot do Discord deverá validar matrícula e e-mail cadastrado antes de liberar acesso;
- Monitores não devem ser o caminho padrão de validação manual;
- o aluno validado recebe `Aluno Verificado` e perde `Aguardando Verificação`;
- o aluno inválido permanece limitado e recebe orientação privada ou efêmera;
- enquanto a API real não existir, o bot poderá usar `MockVerificationProvider`;
- quando a API estiver disponível, a implementação deve trocar para `ApiVerificationProvider`;
- contrato sugerido documentado em [[Bot de Onboarding e Verificação]].

Ainda pendente:

- definir dados obrigatórios e opcionais para validação;
- implementar integração real com a base oficial do Conecta via API;
- definir modelo de recuperação para aluno que não consegue validar;
- definir regras de código de convidado: validade, uso único, revogação e canais liberados;
- definir política de privacidade e retenção dos dados coletados.

## Comunidade geral pós-verificação

Decisão tomada:

- criar categoria `💬 COMUNIDADE GERAL`;
- criar canal `#📍・primeiros-passos`;
- criar canal `#👋・apresente-se`;
- criar canal `#💬・chat-geral`;
- liberar a categoria apenas após verificação do aluno;
- direcionar o aluno para `#📍・primeiros-passos` logo após a verificação;
- direcionar o aluno para `#👋・apresente-se` como primeira ação social depois de ler os primeiros passos;
- manter dúvidas formais de suporte em tickets ou canais específicos.

Permissões definidas:

- `Aguardando Verificação`: não vê;
- `Aluno Verificado`: vê e lê `#📍・primeiros-passos`, mas não escreve nele; vê e envia mensagens em `#👋・apresente-se` e `#💬・chat-geral`;
- `Monitor`: vê, escreve e pode gerenciar mensagens;
- `Admin`: acesso total;
- `Convidado`: não vê por enquanto;
- `Silenciado / Restrito`: não deve enviar mensagens.

Pendente:

- definir acesso de `Ex-Aluno` a essa categoria.

## Avisos oficiais

Decisão tomada:

- criar a seção `📢 AVISOS OFICIAIS`;
- criar canal `#📢・avisos-gerais`;
- criar canal `#🎓・avisos-das-turmas`;
- criar canal `#📅・calendario-e-eventos`;
- separar comunicação oficial de conversa comum;
- evitar que informações importantes se percam no chat geral;
- reforçar que o Discord é a central principal de comunicação do Conecta;
- manter WhatsApp apenas como apoio emergencial ou redirecionamento.

Função dos canais:

- `#📢・avisos-gerais`: comunicados oficiais, institucionais, mudanças gerais, orientações importantes e comunicados amplos;
- `#🎓・avisos-das-turmas`: avisos de aulas, reposições, materiais, prazos, lembretes e orientações dos Monitores;
- `#📅・calendario-e-eventos`: datas importantes, plantões, desafios, eventos, encontros, mentorias e prazos.

Permissões definidas:

- `Aguardando Verificação`: não vê;
- `Aluno Verificado`: vê e lê, mas não envia mensagens;
- `Monitor`: vê e envia mensagens;
- `Admin`: acesso total;
- `Convidado`: não vê;
- `Silenciado / Restrito`: pode ver se já for verificado, mas não envia mensagens.

Pendente:

- definir acesso de `Ex-Aluno` a essa seção.

## Suporte e tickets

- escolher bot público, bot próprio ou integração híbrida para tickets;
- validar se o bot permite botões, status customizados e logs exportáveis;
- definir eventos de ticket salvos no banco do Conecta;
- definir modelo de dados para tickets, status, eventos e pendências;
- definir comando `/pendencias` e resumos automáticos por horário;
- definir quem pode ver pendências operacionais;
- definir quem pode alterar status de tickets;
- definir se Monitores podem escalar diretamente para Admin;
- definir se haverá avaliação de atendimento pelo aluno.

## Base de conhecimento

- definir critérios finais para transformar ticket em tópico;
- definir formato padrão dos tópicos;
- definir quem pode criar, editar e revisar tópicos;
- definir como o bot sinaliza dúvidas recorrentes.

## Moderação e segurança

- definir texto final das regras oficiais;
- decidir se haverá aceite obrigatório das regras no onboarding;
- definir tempo padrão de timeout por tipo de infração;
- definir política final de links e allowlist;
- definir política final para arquivos e anexos;
- definir quais punições exigem Admin.

## Desafios, projetos e ranking

- definir frequência dos desafios mensais;
- definir critérios oficiais de avaliação;
- definir banca ou responsáveis por correção;
- definir aprovação de prêmios em dinheiro;
- definir regra exata de desconto por atraso em projetos opcionais;
- definir limites contra abuso de mensagens, tempo em call e atividade artificial;
- definir se ranking será bot próprio desde o início;
- definir benefícios adicionais para Top 1, Top 2 e Top 3;
- manter projetos reais de clientes fora do ranking no início.

## Plantões de dúvidas

- definir calendário inicial dos plantões;
- definir regra de revezamento dos monitores;
- definir onde alunos sugerem temas;
- definir quais plantões serão gerais, por matéria ou por curso;
- definir se haverá gravação ou resumo posterior.

## Super Módulos

- definir temas dos primeiros Super Módulos;
- definir limite de vagas por Super Módulo;
- definir critérios finais de aprovação;
- definir quais Super Módulos terão projeto final;
- definir regra de lista de espera;
- definir modelo do certificado;
- definir rotina de criação e remoção de cargos/canais no Discord.

## Bots e automações

- pesquisar e escolher bots públicos para tickets, moderação, logs, eventos, voz temporária, analytics e enquetes;
- definir quais automações serão nativas do Discord, públicas ou próprias;
- definir tecnologia, hospedagem e manutenção dos bots próprios;
- definir integração entre onboarding, tickets, vagas, ranking e métricas;
- definir nomes oficiais dos bots.

## Dados, métricas e sistema web

- definir quais dados irão para banco do Conecta;
- definir política de privacidade para suporte, tickets, logs e onboarding;
- definir política de retenção de dados;
- definir quem acessa dados pessoais, logs sensíveis e métricas;
- definir se o dashboard web entra na primeira versão ou em etapa futura;
- definir quais relatórios serão gerados para gestão.

## Documento e apresentação

- transformar a documentação consolidada em apresentação;
- decidir quais decisões precisam estar fechadas antes dos slides.

## Notas relacionadas

- [[Estrutura Final de Canais]]
- [[Cargos e Hierarquia]]
- [[Bot de Onboarding e Verificação]]
- [[Fluxo Detalhado de Suporte]]
- [[Pendências Operacionais]]
- [[Automação de Pendências]]
- [[Desafios, Projetos e Ranking]]
- [[Plantões de Dúvidas]]
- [[Super Módulos]]
- [[Stack de Bots e Automações]]
- [[Métricas e Observabilidade]]
