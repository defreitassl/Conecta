# Bot de Onboarding e Verificação

O Bot de Onboarding e Verificação será obrigatório desde a primeira versão do servidor. Ele controla a entrada, valida a identidade do aluno ou convidado e libera os cargos corretos antes que a pessoa acesse as áreas internas.

## Funções principais

- receber novos membros;
- aplicar ou manter o cargo `Aguardando Verificação`;
- perguntar se a pessoa é Aluno ou Convidado;
- coletar dados de verificação em fluxo privado;
- validar dados contra a base oficial do Conecta, quando a integração existir;
- atribuir cargos automaticamente;
- registrar entrada e verificação no banco de dados;
- impedir acesso indevido aos canais internos;
- registrar tentativas inválidas e erros de verificação.

## Status atual

O fluxo inicial de verificação do aluno foi implementado com sucesso em modo mock.

O bot já consegue:

- exibir o botão de verificação;
- abrir o modal de verificação;
- coletar matrícula e e-mail;
- simular aprovação ou recusa com `MockVerificationProvider`;
- preparar a troca futura para `ApiVerificationProvider`, quando a API real do sistema Conecta estiver disponível.

Esse modo mock permite validar a experiência do Discord antes da integração com o backend oficial.

## Fluxo de aluno

```txt
Aluno entra no servidor
↓
Recebe cargo Aguardando Verificação
↓
Bot inicia onboarding
↓
Aluno informa dados exigidos
↓
Bot consulta a base oficial do Conecta
↓
Se os dados forem válidos, libera acesso
↓
Bot remove Aguardando Verificação
↓
Bot atribui Aluno Verificado e cargos de segmentação
↓
Bot orienta o aluno a acessar #📍・primeiros-passos
↓
Aluno lê o mapa inicial e depois se apresenta em #👋・apresente-se
↓
Banco registra que o aluno entrou no Discord
```

Depois da verificação, a primeira ação recomendada do aluno deve ser acessar `#📍・primeiros-passos` dentro da categoria `💬 COMUNIDADE GERAL`. Esse canal funciona como mapa inicial. Em seguida, o aluno deve ir para `#👋・apresente-se`.

Modelo sugerido para a apresentação:

```txt
Nome:
Curso/Turma:
Cidade:
Nível atual em programação:
O que quer aprender no Conecta:
Uma curiosidade sobre você:
```

Essa etapa ajuda a transformar a liberação de acesso em uma primeira interação social antes do aluno começar a usar o restante da comunidade.

Dados possíveis:

- matrícula;
- e-mail usado no projeto;
- telefone;
- nome completo;
- curso;
- turma, módulo ou trilha, se existir;
- cidade;
- stack ou interesse;
- nível de conhecimento, se aplicável.

## Verificação automática via API do Conecta

Decisão futura de integração: a verificação ideal do aluno não deve depender de validação manual por Monitores. O bot do Discord deve consultar uma API interna do sistema Conecta para confirmar se os dados informados pertencem a um aluno real, ativo e autorizado a acessar a comunidade.

Enquanto o backend ou sistema web do Conecta ainda não estiver disponível para integração, este contrato fica documentado como referência para implementação futura.

### Fluxo planejado

```txt
Aluno entra no servidor Discord
↓
Recebe o cargo Aguardando Verificação
↓
Acessa #verificacao
↓
Clica no botão Iniciar verificação
↓
Bot abre um modal/formulário
↓
Aluno informa matrícula e e-mail cadastrado
↓
Bot envia os dados para a API interna do Conecta
↓
API responde se os dados são válidos
```

Se os dados forem válidos:

- remover o cargo `Aguardando Verificação`;
- adicionar o cargo `Aluno Verificado`;
- registrar log interno da verificação;
- orientar o aluno a ir para `#📍・primeiros-passos` antes de se apresentar em `#👋・apresente-se`.

Se os dados forem inválidos:

- manter o aluno limitado ao fluxo de entrada;
- informar erro privado ou efêmero;
- orientar o aluno a tentar novamente ou procurar suporte.

### Contrato sugerido da API

Endpoint:

```http
POST /api/discord/verify-student
```

Payload:

```json
{
  "discordUserId": "123456789",
  "discordUsername": "usuario",
  "matricula": "20240001",
  "email": "aluno@email.com"
}
```

Resposta aprovada:

```json
{
  "valid": true,
  "student": {
    "id": "student_123",
    "name": "João Silva",
    "email": "aluno@email.com",
    "matricula": "20240001",
    "course": "Programação Web",
    "className": "Turma 01",
    "status": "active"
  }
}
```

Resposta recusada:

```json
{
  "valid": false,
  "reason": "STUDENT_NOT_FOUND"
}
```

Possíveis motivos de recusa:

- `STUDENT_NOT_FOUND`;
- `EMAIL_MISMATCH`;
- `MATRICULA_MISMATCH`;
- `STUDENT_INACTIVE`;
- `ALREADY_LINKED_TO_DISCORD`;
- `INTERNAL_ERROR`.

### Arquitetura de providers

Para manter o bot pronto para a integração futura, a verificação deve ficar atrás de uma camada substituível.

Providers planejados:

- `MockVerificationProvider`: usado enquanto a API real não existir. Pode validar contra uma lista local, fixture, arquivo de configuração ou base temporária de desenvolvimento.
- `ApiVerificationProvider`: usado quando o sistema Conecta expuser o endpoint real `POST /api/discord/verify-student`.

Regra de arquitetura:

```txt
Fluxo do Discord não deve depender diretamente do backend concreto.
Bot chama um VerificationProvider.
Provider atual decide se usa mock local ou API real.
```

Essa separação permite desenvolver o onboarding, modal, mensagens efêmeras, atribuição de cargos e logs antes da API oficial estar disponível.

### Cuidados finais da feature

O fluxo implementado deve respeitar estes cuidados:

- o aluno entra inicialmente com o cargo `Aguardando Verificação`;
- após aprovação, o bot remove `Aguardando Verificação`;
- após aprovação, o bot adiciona `Aluno Verificado`;
- após aprovação, o bot orienta o aluno a ir para `#📍・primeiros-passos`;
- depois de ler `#📍・primeiros-passos`, o aluno deve ser orientado a ir para `#👋・apresente-se`;
- em caso de recusa, a mensagem ao aluno deve ser genérica e segura;
- a mensagem de recusa não deve revelar exatamente se falhou matrícula, e-mail, status ou vínculo com outra conta;
- logs internos da verificação devem ficar visíveis apenas para Admin e Monitor;
- logs não devem registrar dados sensíveis completos;
- evitar registrar e-mail completo nos logs;
- quando necessário para auditoria, mascarar dados como e-mail e matrícula;
- a integração real futura será feita via API do sistema Conecta, substituindo `MockVerificationProvider` por `ApiVerificationProvider`.

## Fluxo de convidado

```txt
Pessoa entra no servidor
↓
Seleciona opção Convidado
↓
Bot solicita código de verificação
↓
Código é validado
↓
Se válido, recebe cargo Convidado
↓
Acesso é liberado apenas aos canais necessários
```

O código de convidado deve ser gerado somente por funcionários autorizados no sistema interno do Conecta, preferencialmente Admins ou equipe com permissão específica. Monitores sem autorização, alunos e pessoas externas não devem conseguir gerar convites privilegiados.

Convidados esperados:

- professores;
- palestrantes;
- ministradores de Super Módulos;
- profissionais externos autorizados para atividades específicas.

## Campos possíveis no banco

Para alunos:

```txt
student_id
discord_user_id
discord_username
discord_display_name
discord_joined_at
discord_verified_at
discord_status
course_id
class_id
module_id
city
interests
assigned_roles
verification_attempts
last_verification_error
```

Para convidados:

```txt
guest_code
guest_name
guest_type
generated_by_admin_id
expires_at
used_at
discord_user_id
allowed_channels
notes
```

## Regras de segurança

- aluno sem cadastro não deve acessar áreas internas;
- aluno não deve conseguir usar dados de outra pessoa;
- convidado não deve entrar sem código válido;
- código de convidado deve ser único, expirar e ser de uso único, se aprovado;
- Admin deve poder revogar código de convidado;
- pessoas não verificadas devem ver apenas canais de entrada;
- pessoas com `Aguardando Verificação` não devem ver a categoria `💬 COMUNIDADE GERAL`;
- convidados não devem ver a categoria `💬 COMUNIDADE GERAL` por enquanto;
- convidados devem acessar somente canais necessários;
- liberações manuais devem ser registradas.

## Privacidade

Dados pessoais não devem ser coletados em canal público. O aluno deve ser informado de que os dados serão usados para identificação, liberação de acesso, organização interna, atribuição de cargos, segurança do servidor e registro de entrada no Discord.

Pendência: definir política de privacidade, retenção e acesso aos dados coletados pelo bot.

## Notas relacionadas

- [[Cargos e Hierarquia]]
- [[Métricas e Observabilidade]]
- [[Decisões Pendentes]]
