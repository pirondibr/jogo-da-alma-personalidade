# Conceito — Página Inicial do Jogo da Alma

> Documento derivado de `second-brain-mvp-jogo-da-alma.md` (MVP 0.1)  
> **Objetivo:** definir estrutura, narrativa, copy e CTAs da homepage antes da implementação final.

---

## 1. Função da página

A homepage é a **porta de entrada** do método. Ela não ensina tudo — ela **orienta, convida e conecta**.

Deve responder, em ordem crescente de profundidade:

1. O que é o Jogo da Alma?
2. Por que as pessoas são diferentes?
3. Como necessidades, chakras e personalidade se conectam?
4. O que o Saber pode mostrar?

**Frase-guia do MVP (rodapé da hero ou selo de marca):**

> *Sua personalidade mostra como você tende a jogar; a proporção mostra o que a situação precisa; a compatibilidade mostra como aproximar os dois.*

---

## 2. Princípios de comunicação

| Princípio | Como aparece na homepage |
|---|---|
| Mapa, não rótulo | Linguagem de tendência: "tende a", "pode", "provavelmente" |
| Todos têm os 7 chakras | Nunca sugerir que alguém "não tem" um chakra |
| Contexto importa | Mencionar que comportamento depende de ambiente, história e estado |
| Saber antes de agir | Foco em compreensão; ferramentas vêm depois |
| Hipóteses, não certezas | Nos CTAs das ferramentas Saber, deixar claro que são reflexões guiadas |

**Tom de voz:** claro, acolhedor, preciso. Espiritualidade presente no Coronário, mas sem jargão místico. Ciência humana aplicada — autoconhecimento prático.

---

## 3. Arquitetura da página (blocos)

```
[Header fixo]
[Hero]
[Problema humano — por que existimos]
[O mapa central — fluxo visual]
[Os 7 chakras — visão rápida]
[Personalidade — tendência, não destino]
[O Saber — dois eixos]
[Como começar — jornada sugerida]
[CTA final]
[Footer]
```

---

## 4. Detalhamento por bloco

### 4.1 Header

**Elementos:**
- Logo / wordmark: **Jogo da Alma**
- Subtítulo discreto: *Personalidades*
- Nav principal (MVP):
  - Jogo da Alma
  - Os 7 Chakras
  - Personalidades
  - Ferramentas
  - Saber ▾ (Proporção · Compatibilidade)
- CTA secundário: **Começar pelo Saber**

**Comportamento:** header transparente sobre hero; sólido ao scroll.

---

### 4.2 Hero

**Headline:**
> Entenda o que você busca — e por que age do jeito que age.

**Subheadline:**
> O Jogo da Alma é um método de autoconhecimento que organiza necessidades, capacidades e tendências humanas por meio dos sete chakras.

**Elemento visual:** diagrama simplificado do fluxo central em linha ou arco:

`Necessidades → Chakras → Personalidade → Capacidades → Ferramentas`

Cada nó clicável leva à página correspondente (futuro).

**CTAs primários:**
- **Explorar o método** → ancora `#mapa` ou página Jogo da Alma
- **Usar o Saber** → dropdown ou página Saber

**Microcopy abaixo dos botões:**
> Mapas para compreender — não rótulos que limitam.

---

### 4.3 Problema humano — "Por que somos diferentes?"

**Título de seção:**
> Tudo o que fazemos busca atender uma necessidade.

**Corpo (3 colunas ou cards):**

| Card | Título | Texto |
|---|---|---|
| 1 | O que move | Cada ação — consciente ou não — tenta receber, preservar ou desenvolver algo interno ou externo. |
| 2 | O que muda | Contexto, história, ambiente e estado emocional também influenciam. Por isso, duas pessoas com a mesma necessidade escolhem caminhos diferentes. |
| 3 | O que organiza | O Jogo da Alma agrupa essas necessidades em sete famílias — os chakras — para tornar visível o que antes parecia confuso. |

**Insight em destaque (pull quote):**
> *Uma mesma ação pode atender várias necessidades ao mesmo tempo.*

Exemplo curto inline: *Começar um negócio pode buscar segurança (Básico), autonomia (Plexo), propósito (Coronário) e expressão (Laríngeo) — tudo de uma vez.*

---

### 4.4 O mapa central

**ID de ancora:** `#mapa`

**Título:**
> O mapa do Jogo da Alma

**Visual:** fluxo horizontal ou vertical interativo com 5 etapas. Cada etapa expande ao hover/click com 1 frase:

| Etapa | Definição curta |
|---|---|
| **Necessidades** | O que você busca atender |
| **Chakras** | Famílias que organizam necessidades e capacidades |
| **Personalidade** | Quais chakras recebem mais energia e atenção |
| **Capacidades** | O que você consegue desenvolver e usar |
| **Ferramentas** | Formas práticas de aplicar essas capacidades |

**Nota de rodapé da seção:**
> Os chakras e as personalidades são mapas. Eles não são o ser humano inteiro.

**Link:** Ver explicação completa → Página "Jogo da Alma"

---

### 4.5 Os 7 chakras — visão rápida

**Título:**
> Sete famílias de necessidades

**Subtítulo:**
> Todos possuem os sete. O que muda é a intensidade, a facilidade de acesso e a forma de expressão.

**Layout:** grade de 7 cards verticais (mobile: carrossel horizontal). Cada card contém:

- Cor/identidade visual do chakra
- Nome + identidade no site (ex.: *Básico · Eficiente · Tradicional*)
- Pergunta principal (ex.: *"Tenho base e segurança suficientes?"*)
- 2–3 necessidades centrais (tags)
- Link: *Conhecer →*

**Cores sugeridas (referência, não dogmática):**

| Chakra | Cor |
|---|---|
| Básico | Vermelho terroso |
| Sacral | Laranja |
| Plexo Solar | Amarelo âmbar |
| Cardíaco | Verde |
| Laríngeo | Azul claro |
| Frontal | Índigo |
| Coronário | Violeta suave |

**CTA de seção:** Ver todos os chakras → Página "Os sete chakras"

---

### 4.6 Personalidade — tendência, não destino

**Título:**
> Personalidade é um mapa de tendências

**Layout:** duas colunas (texto + diagrama)

**Coluna texto — 3 blocos:**

1. **O que é**
   > A combinação de chakras que influencia quais necessidades recebem mais peso e quais capacidades você acessa com mais naturalidade.

2. **O padrão comum**
   > Normalmente, dois ou três chakras são mais dominantes. Eles moldam o que você percebe primeiro, o que energiza e os ambientes com maior compatibilidade.

3. **O que não é**
   > Personalidade não prevê comportamento. Contexto, aprendizado e escolha consciente também participam. Menor facilidade não significa incapacidade.

**Diagrama sugerido:** círculo com 7 segmentos; 2–3 destacados como "principais", 1–2 em tom mais suave como "menos naturais", restante neutro.

**CTA:** Descobrir personalidades → Página "Personalidades"

---

### 4.7 O Saber — dois eixos

**Título:**
> O Saber: compreender antes de escolher

**Subtítulo:**
> Duas formas de olhar — a situação e você nela.

**Dois cards lado a lado:**

#### Card 1 — Saber da Proporção
- **Pergunta:** *O que está faltando ou sobrando nesta situação?*
- **Analisa:** Falta · Proporcional · Excesso em cada chakra relevante
- **Input:** situação ou objetivo + contexto
- **Output:** necessidades envolvidas, sinais em pensamento/emoção/ação, perguntas de reflexão
- **CTA:** Analisar uma situação → Ferramenta Saber — Proporção

#### Card 2 — Saber da Compatibilidade
- **Pergunta:** *O que tende a ser natural ou exigir adaptação?*
- **Analisa:** Tendências da personalidade + grau de combinação com tarefa, ambiente ou ferramenta
- **Níveis:** Natural · Adaptável · Exigente
- **CTA:** Analisar compatibilidade → Ferramenta Saber — Compatibilidade

**Matriz resumida (tabela visual compacta):**

| | Alta compatibilidade | Baixa compatibilidade |
|---|---|---|
| **Proporcional** | Caminho natural | Caminho de desenvolvimento |
| **Desproporcional** | Armadilha da preferência | Evitar ou reformular |

**Nota:** *Quando falta contexto, o Saber apresenta hipóteses — não conclusões.*

---

### 4.8 Como começar — jornada sugerida

**Título:**
> Por onde começar?

**Três passos numerados (timeline horizontal):**

| Passo | Ação | Para quem |
|---|---|---|
| **1** | Ler o mapa central e conhecer os 7 chakras | Quem nunca ouviu falar do método |
| **2** | Usar o Saber da Proporção em uma situação atual | Quem quer entender o que uma situação pede |
| **3** | Usar o Saber da Compatibilidade com sua personalidade | Quem quer saber como aproximar tendência e contexto |

**CTA alternativo:** Navegar ferramentas por necessidade ou chakra → Página "Ferramentas"

---

### 4.9 CTA final

**Fundo em gradiente suave (Coronário → Frontal)**

**Headline:**
> Amplie sua compreensão. Amplie sua escolha.

**Subheadline:**
> O objetivo não é rotular — é ver com mais clareza o que você precisa, quais energias estão atuando e quais ferramentas podem ajudar.

**Botões:**
- Começar pelo Saber da Proporção
- Explorar ferramentas

---

### 4.10 Footer

**Colunas:**
- Sobre (Jogo da Alma · Rafael Terra Nova · MVP 0.1)
- Método (links das páginas principais)
- Ferramentas (Saber Proporção · Saber Compatibilidade)
- Princípios (link para lista resumida dos 14 princípios do MVP)

**Frase de fechamento:**
> *Facilidade não significa superioridade. Dificuldade não significa incapacidade.*

---

## 5. Hierarquia de informação (above the fold)

Prioridade visual na primeira dobra:

1. Headline + definição em uma frase
2. Fluxo `Necessidades → … → Ferramentas`
3. CTA "Explorar o método" + "Usar o Saber"
4. Microcopy anti-rótulo

Tudo o resto fica abaixo do scroll — a homepage **convida**, não **sobrecarrega**.

---

## 6. SEO e metadados

**Title tag:**
`Jogo da Alma — Autoconhecimento por Necessidades e Chakras`

**Meta description:**
`Método de autoconhecimento que organiza necessidades humanas nos sete chakras. Entenda sua personalidade, analise situações com o Saber e encontre ferramentas compatíveis com você.`

**Palavras-chave naturais:** autoconhecimento, chakras, personalidade, necessidades humanas, ferramentas de desenvolvimento pessoal.

---

## 7. Responsividade

| Breakpoint | Adaptação |
|---|---|
| Desktop | Fluxo horizontal; 7 chakras em grade; Saber em 2 colunas |
| Tablet | Chakras em 2×4; Saber empilhado |
| Mobile | Carrossel de chakras; fluxo vertical; nav hamburger |

---

## 8. Microinterações sugeridas

- Hover nos cards de chakra: leve elevação + borda na cor do chakra
- Fluxo do mapa: animação de "pulso" sequencial ao entrar na viewport
- Cards do Saber: flip ou expand para mostrar exemplo de output
- Scroll suave entre âncoras

---

## 9. O que fica fora da homepage (MVP)

Deliberadamente **não** incluir na v1:

- O Fazer e bloqueios entre saber e agir
- Níveis avançados de maturidade
- Manifestação e quatro corpos
- Masculino/feminino
- Todas as combinações de personalidade
- Login, perfil salvo ou resultados persistentes (fase posterior)

---

## 10. Métricas de sucesso (conceituais)

| Métrica | Indica |
|---|---|
| Clique em "Usar o Saber" | Interesse em aplicar o método |
| Scroll até "Os 7 chakras" | Engajamento com o núcleo conceitual |
| Clique em chakra individual | Desejo de aprofundar |
| Tempo na página > 2 min | Leitura real, não bounce |
| Entrada nas ferramentas Saber | Conversão conceito → aplicação |

---

## 11. Próximos passos de implementação

1. Validar copy com Rafael Terra Nova
2. Definir identidade visual (tipografia, paleta, ilustrações dos chakras)
3. Implementar `index.html` / componentes React conforme stack escolhida
4. Conectar CTAs às páginas e ferramentas do MVP (seções 12.2–12.7 do documento base)
5. Testar com 3–5 usuários: entendem o método em < 3 minutos?

---

*Conceito alinhado ao Second Brain MVP — Jogo da Alma v0.1*
