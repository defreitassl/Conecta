# Base de Conhecimento

A base de conhecimento deve reunir respostas úteis, tutoriais e dúvidas frequentes originadas da operação real do Discord.

## Modelo proposto

O servidor poderá ter um fórum de tutoriais e dúvidas frequentes. Esse fórum funcionará como uma base de conhecimento interna do Conecta.

A criação de tópicos será feita pela equipe. Os alunos não poderão abrir tópicos livremente nesse fórum.

## Fluxo de construção

1. aluno abre um ticket;
2. monitor ou suporte responde individualmente;
3. se a dúvida for recorrente ou útil para outros alunos, o monitor transforma a resposta em um tópico no fórum;
4. o tópico fica disponível para consulta futura;
5. novos alunos podem resolver dúvidas comuns sem precisar abrir novo ticket.

## Critérios para transformar ticket em tópico

Um ticket deve virar tópico na base quando:

- a dúvida for recorrente;
- a resposta puder ajudar outros alunos;
- o problema tiver passo a passo claro;
- a demanda aparecer em mais de uma turma, módulo ou ciclo;
- o erro estiver relacionado a ferramenta, plataforma, acesso ou material;
- o Monitor perceber que a resposta será reutilizada em tickets futuros.

## Formato sugerido de tópico

Modelo inicial:

```txt
Problema:
Causa provável:
Passo a passo para resolver:
Observações:
Quando abrir ticket:
```

Esse formato ainda é flexível e deve ser validado conforme os primeiros tópicos forem criados.

Modelo alternativo mais completo, caso o tópico precise de mais contexto:

```txt
Pergunta:
Contexto:
Passo a passo:
Erros comuns:
Links relacionados:
Quando abrir ticket:
```

## Regras de publicação

- alunos não criam tópicos livremente;
- Monitor pode propor e criar tópicos a partir de tickets resolvidos;
- Admin pode revisar tópicos sensíveis ou que envolvam regra administrativa;
- tópicos devem ser objetivos, pesquisáveis e reaproveitáveis;
- tópicos devem evitar expor dados pessoais ou detalhes específicos de um aluno;
- dúvidas que dependem de decisão ainda pendente devem ser marcadas como pendentes ou a definir.

## Critérios para virar tópico

Sinais de que uma dúvida deve ser registrada:

- apareceu mais de uma vez;
- exige passo a passo;
- envolve ferramenta, acesso, instalação, plataforma ou material;
- a resposta pode ser reaproveitada em outro ticket;
- a dúvida apareceu em plantão ou call e pode ajudar outros alunos;
- o mesmo problema gerou confusão em chat geral ou fórum.

A transformação de dúvidas em documentação deve seguir este modelo e os dados registrados em [[Pendências Operacionais]].

## Registro operacional

Sempre que um ticket, plantão ou discussão virar tópico da base, essa conversão deve ficar registrada no atendimento original ou no canal interno definido.

Registro mínimo sugerido:

```txt
Origem:
Categoria:
Resumo da dúvida:
Tópico criado:
Criado por:
Precisa revisão de Admin? sim/não
```

Casos que envolvam regra administrativa, conflito sensível, dados pessoais ou decisão ainda pendente devem ser marcados como pendente, a definir ou enviados para revisão de Admin antes de virarem orientação pública.

## Relação com métricas

A base deve ser analisada junto com [[Métricas e Observabilidade]].

Indicadores úteis:

- tickets que viraram tópico;
- tópicos mais usados em respostas;
- categorias com mais dúvidas recorrentes;
- dúvidas frequentes ainda sem documentação;
- temas que continuam gerando tickets mesmo depois de documentados.

## Notas relacionadas

- [[Fluxo Detalhado de Suporte]]
- [[Pendências Operacionais]]
