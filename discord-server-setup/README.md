# Setup do servidor Discord Conecta

Script base para preparar categorias, canais e o fluxo de verificação do servidor Discord Conecta usando um bot oficial via Discord API.

## Antes de rodar

No Discord Developer Portal:

1. Crie uma aplicação.
2. Crie um bot.
3. Ative as permissões necessárias no convite do bot:
   - Manage Roles
   - Manage Channels
   - View Channels
   - Send Messages
   - Manage Messages, se quiser preparar moderação depois
4. Convide o bot para o servidor.
5. No servidor, deixe o cargo do bot acima dos cargos que ele precisará gerenciar.

## Configuração local

```bash
cp .env.example .env
npm install
```

Depois edite `.env`:

```txt
DISCORD_TOKEN=token_do_bot
DISCORD_GUILD_ID=id_do_servidor
```

## Comandos

Ver o plano sem criar nada:

```bash
npm run plan
```

Aplicar no servidor:

```bash
npm run apply
```

Rodar o bot, mantendo o processo online para responder aos botões, modais, verificação e tickets de suporte:

```bash
npm run bot
```

Checar sintaxe:

```bash
npm run check
```

## Verificação automática

O `npm run apply` prepara o canal `#verificação` com uma mensagem fixa e o botão **Iniciar verificação**, além do canal privado `#logs-verificacao` para Admin e Monitor.

O fluxo atual usa `MockVerificationProvider`. Casos disponíveis para teste:

- Aprovado: matrícula `2024001`, e-mail `aluno.aprovado@conecta.test`
- Recusado por e-mail divergente: matrícula `2024002`, qualquer e-mail diferente de `email.correto@conecta.test`
- Recusado por aluno não encontrado: qualquer matrícula que não esteja no mock

Quando a integração real existir, substitua o provider em `src/verification/providers.js` por `ApiVerificationProvider`, preparado para chamar:

```txt
POST /api/discord/verify-student
```

## Suporte por tickets

O `npm run apply` prepara a seção `🎫 SUPORTE`, com `#📖・como-pedir-ajuda`, `#🎫・abrir-ticket` e a categoria privada `🎫 TICKETS ABERTOS`.

O `npm run bot` mantém ativo o botão **Abrir ticket**, mostra um dropdown efêmero para escolher a categoria, abre o modal de suporte, cria um canal privado para o aluno, Monitor e Admin, e permite fechar o ticket pelo botão **Fechar ticket**.

## Segurança

- Nunca coloque o token do bot em arquivos Markdown, HTML ou mensagens.
- O arquivo `.env` fica ignorado pelo Git.
- O script procura cargos existentes pelo nome e não cria cargos novos automaticamente.
- O script procura canais existentes pelo nome antes de criar, para reduzir duplicação.
