# Automação de Pendências

Esta nota descreve a automação desejada para transformar tickets, atendimentos e casos em andamento em pendências operacionais rastreáveis.

A automação deve reduzir registro manual dos Monitores e criar dados estruturados para suporte, observabilidade e futuro sistema web do Conecta.

## Princípio

```txt
Bot público para operação genérica.
Bot próprio ou integração para regra de negócio do Conecta.
```

O Conecta pode usar um bot público de tickets, um bot próprio ou uma integração entre os dois. A decisão técnica ainda está pendente.

## Fluxo ideal

```txt
Ticket no Discord
↓
Bot registra eventos e status
↓
Banco de dados do Conecta
↓
Resumo automático no Discord
↓
Dashboard web futuro
```

O canal `#pendências-do-dia` deve receber resumos, alertas e exceções, mas não deve ser a fonte principal da verdade.

## Eventos que devem ser registrados

- ticket criado;
- categoria selecionada;
- responsável atribuído;
- primeira resposta enviada;
- mudança de status;
- escalonamento para Admin;
- marcação como aguardando aluno;
- marcação como aguardando Monitor;
- marcação como dúvida recorrente;
- marcação como base de conhecimento;
- resolução;
- fechamento;
- reabertura, se existir;
- estouro de prazo ideal ou máximo.

## Botões e comandos

O Monitor deve interagir com ações simples.

Botões possíveis:

```txt
[Assumir ticket]
[Aguardando aluno]
[Aguardando Monitor]
[Escalar para Admin]
[Marcar como dúvida recorrente]
[Virou base de conhecimento]
[Resolver]
[Fechar ticket]
```

Comando inicial sugerido:

```txt
/pendencias
```

Esse comando deve gerar um resumo operacional por status, responsável, prazo e prioridade.

## Resumos automáticos

O bot pode publicar resumos em `#pendências-do-dia` em horários definidos:

- fim da manhã;
- fim da tarde;
- fim do dia;
- troca de turno.

Esses resumos devem destacar tickets sem responsável, tickets sem resposta recente, tickets próximos do prazo, tickets aguardando Admin e tickets candidatos à [[Base de Conhecimento]].

## Integração com sistema web

O Discord deve funcionar como camada operacional, mas o sistema web do Conecta pode se tornar a camada de gestão, visualização e tomada de decisão.

Dados de tickets e pendências podem alimentar um dashboard interno com:

- tickets abertos;
- tickets pendentes;
- pendências por status;
- tickets por Monitor;
- tickets por categoria;
- alertas de SLA;
- gargalos operacionais;
- carga de trabalho dos Monitores;
- dúvidas recorrentes;
- indicadores de qualidade do suporte.

## Privacidade e acesso

Dados de suporte podem conter informações pessoais, acadêmicas ou sensíveis. A automação deve respeitar regras de acesso por cargo, política de retenção e limites de visualização.

Pendência: definir quem pode ver pendências operacionais, quem pode alterar status de tickets e quais dados podem aparecer em resumos automáticos.

## Notas relacionadas

- [[Pendências Operacionais]]
- [[Métricas e Observabilidade]]
- [[Decisões Pendentes]]
