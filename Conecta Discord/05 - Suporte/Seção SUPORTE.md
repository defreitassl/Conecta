# Seção SUPORTE

Esta nota documenta a criação da categoria `🎫 SUPORTE` no Discord do Conecta.

A seção deve centralizar pedidos de ajuda, evitar que problemas fiquem perdidos no chat geral e organizar o atendimento por tickets privados.

## Categoria principal

```txt
🎫 SUPORTE
```

### Canais

```txt
#📖・como-pedir-ajuda
#🎫・abrir-ticket
```

## #📖・como-pedir-ajuda

Canal explicativo para orientar alunos antes da abertura de ticket.

Preferencialmente, deve ser somente leitura para alunos. Monitores e Admins podem publicar ou atualizar orientações.

Objetivos:

- explicar como pedir ajuda corretamente;
- reforçar que suporte não deve ficar perdido no chat geral;
- orientar o aluno a organizar o problema antes de abrir ticket;
- reduzir tickets incompletos, repetidos ou difíceis de entender;
- direcionar dúvidas formais para o fluxo de suporte.

Orientação mínima para o aluno:

```txt
Antes de abrir um ticket, descreva:

1. O que você estava tentando fazer
2. Onde o problema aconteceu
3. Qual erro ou dificuldade apareceu
4. O que você já tentou
5. Links, prints ou mensagens de erro, se existirem
6. Sua turma, aula, módulo ou material relacionado, quando fizer sentido
```

Mensagem central:

```txt
Use o chat geral para conversa e trocas rápidas.
Use ticket quando precisar de acompanhamento, resposta da equipe ou análise de um problema específico.
```

## #🎫・abrir-ticket

Canal onde o aluno inicia o atendimento.

Deve conter uma mensagem fixa com o botão:

```txt
Abrir ticket
```

O botão deve iniciar o fluxo de abertura de ticket via bot.

Após o clique, o bot deve exibir um dropdown/select menu com categorias fixas de suporte. O aluno escolhe a categoria antes de abrir o modal de descrição.

Este canal deve ser simples e sem conversa paralela. O aluno deve entender que a ação principal é clicar no botão para iniciar o atendimento.

## Categoria dinâmica interna

```txt
🎫 TICKETS ABERTOS
```

Esta categoria deve agrupar os canais privados criados pelo bot para cada atendimento.

Cada ticket deve ser visível apenas para:

- aluno que abriu o ticket;
- Monitor;
- Admin;
- bot responsável pelo fluxo.

Outros alunos não devem conseguir ver tickets de terceiros.

## Tipos de suporte V1

Tipos iniciais disponíveis no dropdown/select menu:

- 💻 Dúvida técnica;
- 🔐 Problema de acesso;
- 🎓 Dúvida sobre aula/turma;
- 📚 Problema com material;
- 📄 Certificado ou documentação;
- ❔ Outro assunto.

Esses tipos substituem a escolha genérica de categoria no fluxo inicial e devem alimentar triagem, logs, métricas e base de conhecimento.

O tipo/categoria do ticket não deve ser digitado manualmente pelo aluno. A categoria deve vir do dropdown/select menu para reduzir erros de preenchimento e facilitar a identificação visual dos tickets pelos Monitores.

## Modal de descrição

O modal/formulário não precisa pedir `tipo de suporte`, pois essa informação já vem da categoria escolhida no dropdown.

Campos esperados no modal:

- descrição do problema;
- print, link ou observação opcional, se viável.

## Padrão de nomes dos tickets

O canal privado criado pelo bot deve ser identificado pela categoria escolhida.

Padrão V1:

```txt
ticket-tecnico-nome
ticket-acesso-nome
ticket-aula-nome
ticket-material-nome
ticket-certificado-nome
ticket-outro-nome
```

O sufixo `nome` deve representar o aluno solicitante, seguindo a normalização que o bot adotar para nomes de canais.

## Fluxo planejado

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

## Permissões

### 🎫 SUPORTE

```txt
Aguardando Verificação: não vê
Aluno Verificado: vê a seção, lê #📖・como-pedir-ajuda e usa #🎫・abrir-ticket
Monitor: vê, responde e acompanha tickets
Admin: acesso total
Convidado: não vê
Silenciado / Restrito: vê apenas se já for verificado, mas não deve enviar mensagens
Bot: acesso necessário para exibir botão, abrir modal e criar tickets
```

### #📖・como-pedir-ajuda

```txt
Aluno Verificado: vê e lê, mas não envia mensagens
Monitor: vê e envia mensagens
Admin: acesso total
Silenciado / Restrito: não envia mensagens
```

### #🎫・abrir-ticket

```txt
Aluno Verificado: vê o canal e pode acionar o botão "Abrir ticket"
Monitor: vê e acompanha funcionamento do fluxo
Admin: acesso total
Silenciado / Restrito: não deve enviar mensagens; decisão pendente se pode acionar botão
Bot: gerencia botão e inicia fluxo de atendimento
```

### 🎫 TICKETS ABERTOS

Permissão padrão da categoria:

```txt
Aluno Verificado: não vê a categoria por padrão
Monitor: vê os tickets
Admin: acesso total
Bot: cria, edita e fecha canais de ticket
Convidado: não vê
Aguardando Verificação: não vê
Silenciado / Restrito: não deve enviar mensagens
```

Permissão por ticket:

```txt
Aluno solicitante: vê e envia mensagens no próprio ticket
Outros alunos: não veem
Monitor: vê e responde
Admin: acesso total
Bot: gerencia o canal
```

## Relação com outros canais

O suporte formal não deve acontecer no `#💬・chat-geral`.

O chat geral pode receber dúvidas rápidas e interações da comunidade, mas problemas que exigem acompanhamento, análise individual, acesso administrativo, material específico ou histórico devem ser direcionados para tickets.

Quando uma dúvida recorrente for resolvida em ticket, ela pode virar tópico na [[Base de Conhecimento]].

## Notas relacionadas

- [[Fluxo Detalhado de Suporte]]
- [[Base de Conhecimento]]
- [[Estrutura Final de Canais]]
- [[Métricas e Observabilidade]]
