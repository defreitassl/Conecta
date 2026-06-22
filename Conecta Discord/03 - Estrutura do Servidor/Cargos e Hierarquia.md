# Cargos e Hierarquia

A estrutura inicial de cargos do Discord Conecta deve ser simples, segura e fácil de operar.

Regra central:

```txt
Hierarquia define poder.
Segmentação define contexto.
```

Cargos de curso, turma, cidade, stack ou nível não devem conceder permissões administrativas. Eles servem apenas para liberar canais específicos, segmentar avisos e organizar a experiência do aluno.

Não serão criados cargos separados de Professor, Coordenação ou Direção na hierarquia inicial do Discord.

## Hierarquia inicial

```txt
Admin
Monitor
Aluno Verificado
Aguardando Verificação
Ex-Aluno
Convidado
Silenciado / Restrito
Segmentações acadêmicas ou de interesse
```

## Cargos principais

| Cargo | Função | Acesso esperado | Restrições principais |
|---|---|---|---|
| Admin | Configura e protege o servidor | Todos os canais, logs, bots, cargos, permissões e tickets | Deve ficar restrito a poucas pessoas |
| Monitor | Opera suporte, moderação leve e rotina do Discord | Canais de alunos, suporte, tickets, base, plantões e canais internos necessários | Não deve gerenciar servidor, cargos, canais ou bots críticos |
| Aluno Verificado | Aluno ativo liberado | Avisos, suporte, comunidade geral pós-verificação, vagas, desafios, canais acadêmicos e plantões | Não acessa logs, canais internos ou tickets de outros alunos |
| Aguardando Verificação | Entrada temporária | Boas-vindas, regras, instruções e verificação | Não acessa comunidade, vagas, desafios, calls ou área acadêmica |
| Ex-Aluno | Continuidade pós-curso | Comunidade, vagas e eventos abertos, se aprovado | Não acessa turmas ativas, logs, tickets ou áreas internas |
| Convidado | Acesso externo limitado | Apenas canais/eventos liberados | Não acessa suporte, comunidade geral, dados de alunos, canais internos ou estrutura completa |
| Silenciado / Restrito | Sanção temporária | Canais mínimos de orientação, se existirem | Sem interação livre, calls, desafios, links ou arquivos |

## Comunidade geral pós-verificação

A categoria `💬 COMUNIDADE GERAL` deve ser liberada somente após a verificação.

Permissões esperadas:

| Cargo | Permissão na categoria |
|---|---|
| Aguardando Verificação | Não vê |
| Aluno Verificado | Vê e lê `#📍・primeiros-passos`, mas não escreve nele; vê e envia mensagens em `#👋・apresente-se` e `#💬・chat-geral` |
| Monitor | Vê, escreve e pode gerenciar mensagens |
| Admin | Acesso total |
| Convidado | Não vê por enquanto |
| Ex-Aluno | Decisão futura |
| Silenciado / Restrito | Não deve enviar mensagens |

Canais da categoria:

```txt
#📍・primeiros-passos
#👋・apresente-se
#💬・chat-geral
```

O canal `#📍・primeiros-passos` deve ser o primeiro destino recomendado para o aluno após receber o cargo `Aluno Verificado`. Depois de ler esse mapa inicial, o aluno deve ser orientado a ir para `#👋・apresente-se` como primeira ação social.

## Avisos oficiais

A seção `📢 AVISOS OFICIAIS` concentra a comunicação oficial do Conecta e evita que informações importantes se percam em canais de conversa comum.

Canais da categoria:

```txt
#📢・avisos-gerais
#🎓・avisos-das-turmas
#📅・calendario-e-eventos
```

Permissões esperadas:

| Cargo | Permissão na categoria |
|---|---|
| Aguardando Verificação | Não vê |
| Aluno Verificado | Vê e lê, mas não envia mensagens |
| Monitor | Vê e envia mensagens |
| Admin | Acesso total |
| Convidado | Não vê |
| Ex-Aluno | Decisão futura |
| Silenciado / Restrito | Pode ver se já for verificado, mas não envia mensagens |

O Discord deve ser tratado como central principal de comunicação do Conecta. WhatsApp fica apenas como apoio emergencial ou redirecionamento.

## Segmentação

Segmentações possíveis:

- curso, módulo ou turma;
- Super Módulo;
- grupo de projeto;
- participação em desafio;
- cidade;
- stack ou interesse;
- nível de conhecimento.

Essas segmentações permanecem pendentes até o modelo acadêmico do Conecta estar claro.

## Gamificação e engajamento

Além de liberar acesso, cargos podem funcionar como reconhecimento público.

Usos esperados:

- cargos de destaque por ranking;
- cargos de participação em Super Módulos;
- cargos temporários de eventos, desafios ou projetos;
- cargos de conclusão, certificado ou conquista;
- cargos raros para incentivar engajamento contínuo.

Regra:

```txt
Cargos de conquista devem ter valor visível, mas não devem conceder permissões sensíveis.
```

Os nomes finais e funções específicas desses cargos serão definidos depois, com mais calma e criatividade.

## Permissões críticas

Monitores e cargos de segmentação não devem receber:

- `Administrator`;
- `Manage Server`;
- `Manage Roles`;
- `Manage Channels`;
- `Manage Webhooks`;
- gestão de bots;
- acesso a logs sensíveis;
- acesso a canais privados de Admin;
- `@everyone` ou `@here`, salvo exceção documentada.

Permissões que podem ser avaliadas para Monitor:

- responder tickets;
- criar ou editar tópicos na [[Base de Conhecimento]];
- moderar mensagens em canais de alunos, se aprovado;
- conduzir plantões e mover membros em chamadas;
- visualizar logs operacionais específicos;
- aplicar timeout ou advertência leve, se aprovado.

## Pendências

- definir nomes finais dos cargos;
- definir nomes descontraídos ou ligados à identidade do Conecta;
- definir acesso de Ex-Aluno;
- definir se Ex-Aluno acessará a categoria `💬 COMUNIDADE GERAL`;
- definir frequência de uso do cargo Convidado;
- definir canais liberados para Convidado;
- definir cargos de conquista, ranking, Super Módulos e desafios;
- definir se Monitor poderá apagar mensagens, aplicar timeout e visualizar logs específicos;
- definir segmentações acadêmicas finais.

## Notas relacionadas

- [[Bot de Onboarding e Verificação]]
- [[Punições e Advertências]]
- [[Decisões Pendentes]]
