# Pendências Operacionais

Pendências operacionais não devem depender principalmente de anotação manual. Elas devem ser tratadas como estado operacional de tickets, atendimentos, plantões, dúvidas ou casos em andamento.

Regra:

```txt
Registro automático como padrão.
Registro manual como apoio.
```

O canal `#pendências-do-dia` pode existir, mas deve funcionar como apoio para resumos automáticos, alertas e exceções. A fonte principal da verdade deve ser o ticket, o bot, o banco de dados ou a integração definida.

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

## Dados que o sistema deve registrar

- aluno e ID do usuário no Discord;
- categoria do ticket;
- horário de abertura;
- status atual;
- responsável;
- última interação;
- tempo desde abertura;
- tempo desde última resposta;
- estouro de prazo ideal ou máximo;
- escalonamento para Admin;
- espera por aluno, Monitor ou Admin;
- marcação de dúvida recorrente;
- marcação de base de conhecimento;
- horário de fechamento;
- tempo total até resolução.

## Ações simples para Monitor

O Monitor deve interagir com botões, comandos ou menus, não com preenchimento manual extenso.

Exemplos:

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

## Status sugeridos

```txt
Aberto
Assumido
Em atendimento
Aguardando aluno
Aguardando Monitor
Aguardando Admin
Escalado para Admin
Resolvido
Fechado
Pode virar base de conhecimento
Virou base de conhecimento
Encerrado sem ação
```

Esses status são flexíveis e dependem do bot ou integração escolhida.

## Comando sugerido

```txt
/pendencias
```

Esse comando deve gerar um resumo por status, responsável, prazo e prioridade. O bot também pode publicar resumos em `#pendências-do-dia` no fim da manhã, fim da tarde, fim do dia ou troca de turno.

## Registro manual como exceção

O modelo manual deve ser usado apenas quando o bot não cobrir a situação.

Exemplos:

- observação qualitativa sobre aluno;
- contexto sensível de moderação;
- problema que ainda não virou ticket;
- alerta sobre plantão ou evento;
- acompanhamento de grupo travado;
- decisão humana ainda pendente.

## Relação com sistema web

O Discord deve funcionar como camada operacional. O sistema web do Conecta pode se tornar a camada de gestão, visualização e tomada de decisão.

Dados automáticos podem alimentar:

- tickets abertos e pendentes;
- tickets por categoria;
- tickets por Monitor;
- tempo médio de resposta;
- tempo médio de resolução;
- tickets aguardando Admin ou aluno;
- dúvidas recorrentes;
- gargalos operacionais;
- alertas de SLA;
- carga de trabalho dos Monitores.

## Notas relacionadas

- [[Automação de Pendências]]
- [[Métricas e Observabilidade]]
- [[Decisões Pendentes]]
