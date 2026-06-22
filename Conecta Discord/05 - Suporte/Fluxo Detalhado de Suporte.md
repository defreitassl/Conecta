# Fluxo Detalhado de Suporte

O suporte deve funcionar por tickets. O aluno abre um ticket em `#abrir-ticket`, escolhe uma categoria e o atendimento passa a ser rastreável.

A versão atual planejada para a área de suporte está documentada em [[Seção SUPORTE]] e usa a categoria `🎫 SUPORTE`, com orientação em `#📖・como-pedir-ajuda`, abertura em `#🎫・abrir-ticket`, seleção de categoria por dropdown e tickets privados agrupados em `🎫 TICKETS ABERTOS`.

## Fluxo

```txt
Aluno abre ticket
↓
Seleciona categoria
↓
Envia dúvida ou descreve o problema
↓
Bot registra dados e status
↓
Monitor assume atendimento
↓
Status muda para Em atendimento
↓
Responde dentro do prazo
↓
Resolve ou escala para Admin
↓
Fecha ticket
↓
Ticket é registrado em logs
↓
Se for dúvida comum, vira base de conhecimento
↓
Dados alimentam métricas e histórico operacional
```

## Categorias iniciais

- Acesso;
- Aula;
- Dúvida técnica / código;
- Certificado;
- Projeto;
- Outro.

Categorias detalhadas que podem existir como subcategorias:

- Problema de acesso;
- Dúvida sobre aula ou material;
- Dúvida administrativa;
- Certificado / presença;
- Problema com plataforma;
- Sugestão ou feedback;
- Outro.

## Tipos de suporte V1

Tipos definidos para o dropdown/select menu do fluxo V1:

- 💻 Dúvida técnica;
- 🔐 Problema de acesso;
- 🎓 Dúvida sobre aula/turma;
- 📚 Problema com material;
- 📄 Certificado ou documentação;
- ❔ Outro assunto.

Esses tipos devem aparecer no fluxo iniciado pelo botão `Abrir ticket` em `#🎫・abrir-ticket`.

O aluno não deve digitar a categoria manualmente. O bot deve exibir categorias fixas em um dropdown/select menu antes de abrir o modal de descrição.

Essa mudança facilita a identificação visual dos tickets pelos Monitores e reduz erros de preenchimento pelos alunos.

## Modal V1

O modal não precisa mais pedir `tipo de suporte`, pois essa informação vem do dropdown.

Campos esperados:

- descrição do problema;
- print, link ou observação opcional, se viável.

## Padrão de nomes dos tickets

```txt
ticket-tecnico-nome
ticket-acesso-nome
ticket-aula-nome
ticket-material-nome
ticket-certificado-nome
ticket-outro-nome
```

O canal deve ser criado dentro de `🎫 TICKETS ABERTOS` e identificado pela categoria selecionada.

## Fluxo V1 planejado

```txt
Aluno acessa #🎫・abrir-ticket
↓
Clica em "Abrir ticket"
↓
Bot exibe dropdown com categorias de suporte
↓
Aluno escolhe uma categoria
↓
Bot abre modal/formulário para descrição do problema
↓
Aluno informa descrição do problema e, se viável, print/link/observação opcional
↓
Bot cria canal privado identificado pela categoria em 🎫 TICKETS ABERTOS
↓
Monitor responde
↓
Ticket é fechado quando resolvido
```

## Prazos

```txt
Primeira resposta ideal: até 12h
Primeira resposta máxima: até 15h
Horário de operação considerado: 9h às 21h
```

Se o ticket for aberto fora do horário, o prazo começa no próximo período de atendimento.

## Status sugeridos

- Aberto;
- Assumido;
- Em atendimento;
- Aguardando aluno;
- Aguardando Monitor;
- Aguardando Admin;
- Escalado para Admin;
- Resolvido;
- Fechado;
- Pode virar base de conhecimento;
- Virou base de conhecimento;
- Encerrado sem ação.

## Triagem

A triagem deve evitar tickets esquecidos, respostas duplicadas e escalonamentos desnecessários.

Critérios:

- categoria;
- horário de abertura;
- tempo restante para primeira resposta;
- urgência;
- necessidade de acesso administrativo;
- existência de resposta na [[Base de Conhecimento]];
- risco de caso sensível.

## Escalonamento para Admin

Escalar quando houver:

- decisão interna;
- problema sensível;
- conflito com aluno;
- acesso administrativo;
- regra ainda não definida;
- problema técnico de sistema, bot ou plataforma;
- autorização superior.

## Base de conhecimento

Dúvidas recorrentes devem virar tópicos na [[Base de Conhecimento]]. O bot pode sugerir recorrência por categoria, erro ou palavra-chave.

## Registro de logs

Ao fechar um ticket, o sistema deve registrar no log:

- identificador do ticket;
- categoria;
- responsável;
- status final;
- horário de abertura;
- horário de fechamento;
- se foi resolvido, escalado ou encerrado sem ação;
- se virou ou pode virar base de conhecimento.

Logs de tickets devem ficar em área restrita da equipe e podem alimentar [[Métricas e Observabilidade]].

## Métricas de suporte

- tickets abertos e fechados;
- categorias mais frequentes;
- tempo médio de primeira resposta;
- tempo médio de resolução;
- tickets por Monitor;
- tickets escalados para Admin;
- tickets sem responsável;
- tickets sem resposta recente;
- tickets aguardando aluno ou Admin;
- tickets que viraram base de conhecimento;
- alertas de SLA;
- horários de maior demanda.

Essas métricas devem alimentar [[Métricas e Observabilidade]].

## Notas relacionadas

- [[Seção SUPORTE]]
- [[Base de Conhecimento]]
- [[Pendências Operacionais]]
- [[Automação de Pendências]]
- [[Stack de Bots e Automações]]
- [[Métricas e Observabilidade]]
- [[Decisões Pendentes]]
