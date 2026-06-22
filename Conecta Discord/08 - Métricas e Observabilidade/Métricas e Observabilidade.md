# Métricas e Observabilidade

Alguns indicadores úteis:

- quantidade de alunos ativos por semana;
- quantidade de mensagens em canais acadêmicos;
- quantidade de dúvidas abertas;
- quantidade de tickets criados;
- tempo médio de resposta em tickets;
- quantidade de tickets resolvidos;
- tempo médio de resolução de tickets;
- tickets escalados para Admin;
- tickets respondidos por Monitor;
- participação dos Monitores em plantões;
- presença dos Monitores em calls;
- dúvidas recorrentes registradas por Monitores;
- tópicos criados na base de conhecimento por Monitor;
- pendências automáticas por dia;
- pendências por status;
- pendências por Monitor;
- pendências que ultrapassaram prazo;
- tickets sem responsável;
- tickets sem resposta recente;
- tickets aguardando Admin;
- tickets aguardando aluno;
- alertas de SLA;
- principais problemas da semana reportados pelos Monitores;
- principais tipos de problema reportados;
- quantidade de dúvidas transformadas em tópicos na base de conhecimento;
- horários de maior demanda de suporte;
- tickets sem primeira resposta dentro do prazo máximo;
- participação em plantões de dúvidas;
- participação em desafios;
- número de participantes por desafio;
- número de entregas por desafio;
- taxa de conclusão dos desafios;
- temas de desafios mais populares;
- projetos enviados por alunos;
- projetos mais bem avaliados;
- projetos opcionais entregues dentro e fora do prazo;
- certificados de Super Módulos emitidos;
- matrículas e vagas ocupadas em Super Módulos;
- alunos com maior evolução;
- tempo médio em calls de desenvolvimento;
- pontos distribuídos por categoria no ranking;
- pontos por evolução no curso;
- pontos por Super Módulos;
- pontos por projetos opcionais;
- pontos por atividade útil no Discord;
- mudanças no ranking;
- dias no topo;
- dias em Top 3 e Top 10;
- vitórias por aluno;
- vagas divulgadas;
- denúncias, punições e advertências aplicadas;
- canais mais utilizados;
- canais pouco utilizados.
- alunos que entraram no Discord;
- alunos que ainda não entraram no Discord;
- alunos verificados;
- falhas de verificação;
- tentativas inválidas de verificação;
- códigos de convidado gerados, usados, expirados ou revogados;
- vagas publicadas automaticamente;
- vagas por stack, cidade, nível ou modalidade, se esses filtros existirem.

## Uso esperado

Essas métricas devem ajudar a coordenação e a equipe operacional a entender adesão, suporte, engajamento, gargalos e pontos de melhoria.

## Logs operacionais

Logs devem apoiar métricas, moderação e auditoria.

Exemplos:

- logs de moderação;
- logs de tickets;
- logs de cargos;
- logs de bots;
- logs de entrada e saída;
- logs de verificação;
- relatórios consolidados.

Logs sensíveis devem ficar restritos a Admin.

No fluxo de verificação do aluno, logs internos devem ficar visíveis apenas para Admin e Monitor. Esses logs devem registrar o suficiente para auditoria operacional, mas sem expor dados sensíveis completos. Evitar especialmente e-mail completo; quando necessário, usar mascaramento ou identificadores internos.

## Métricas específicas de suporte

As métricas de suporte devem ser geradas a partir de [[Fluxo Detalhado de Suporte]].

Indicadores de prazo sugeridos:

- percentual de tickets respondidos em até 12h;
- percentual de tickets respondidos em até 15h;
- tickets abertos por mais de 24h, 48h e 72h;
- tempo médio de fechamento;
- volume de tickets por categoria.

## Métricas operacionais dos Monitores

A rotina dos Monitores deve gerar dados para análise futura, preferencialmente de forma automática por tickets, bot próprio ou integração com bot de tickets.

Indicadores possíveis:

- tickets respondidos por Monitor;
- tempo médio de primeira resposta por Monitor;
- tempo médio de fechamento por Monitor ou por categoria;
- quantidade de tickets escalados para Admin;
- dúvidas recorrentes registradas;
- tópicos criados na [[Base de Conhecimento]];
- participação dos Monitores em plantões;
- presença em calls;
- quantidade de advertências ou moderações;
- principais problemas da semana;
- quantidade de pendências automáticas por status;
- tickets sem responsável;
- tickets sem resposta recente;
- tickets aguardando Admin;
- tickets aguardando aluno;
- alertas de SLA.

Esses dados ajudam a entender carga de trabalho, gargalos, qualidade do suporte e necessidade de ajustar escala.

Fontes possíveis:

- bot ou sistema de tickets;
- [[Automação de Pendências]];
- registros em `#triagem-suporte`;
- registros em `#pendências-do-dia`;
- registros em `#dúvidas-recorrentes`;
- logs de moderação;
- agenda de plantões;
- registros manuais de exceção em [[Pendências Operacionais]].

Ainda está pendente definir quais dados serão automáticos, quais exceções serão manuais e como esses dados alimentarão o dashboard web futuro.

## Métricas de desafios e ranking

O [[Desafios, Projetos e Ranking]] deve gerar dados úteis para relatórios internos.

Indicadores possíveis:

- número de participantes por desafios mensais;
- número de entregas;
- taxa de conclusão;
- temas mais populares;
- alunos mais ativos;
- projetos mais bem avaliados;
- alunos com maior evolução;
- tempo médio em calls de desenvolvimento;
- pontos distribuídos por categoria;
- alunos com 100% em cada categoria;
- alunos elegíveis a certificado por permanência de 30 dias;
- certificados emitidos por Top 50, Top 20, Top 10, Top 5, Top 3, Top 2 e Top 1;
- mudanças no ranking;
- dias no topo;
- vitórias por aluno.

Esses dados ajudam a equipe a entender engajamento real, qualidade das entregas e recorrência de participação.

## Métricas de Super Módulos

Indicadores possíveis:

- matrículas por Super Módulo;
- vagas disponíveis e ocupadas;
- alunos em mais de um Super Módulo simultâneo;
- frequência nas aulas;
- alunos com pelo menos 50% de presença;
- projetos finais entregues;
- certificados emitidos;
- cargos liberados e removidos no Discord;
- pontos gerados para a categoria de Super Módulos no ranking.

## Métricas de onboarding e bots

O [[Bot de Onboarding e Verificação]] deve alimentar métricas de entrada, validação e problemas de acesso.

Indicadores possíveis:

- novos membros por semana;
- verificações aprovadas;
- verificações recusadas;
- tempo médio até verificação;
- tentativas inválidas por aluno;
- principais erros de verificação;
- convidados ativos;
- códigos de convidado expirados ou revogados;
- alunos cadastrados que ainda não entraram no servidor.

Um futuro bot ou integração de métricas pode consolidar esses dados com tickets, eventos, ranking, vagas e relatórios.

## Notas relacionadas

- [[Pendências Operacionais]]
- [[Automação de Pendências]]
- [[Desafios, Projetos e Ranking]]
- [[Bot de Onboarding e Verificação]]
- [[Stack de Bots e Automações]]
