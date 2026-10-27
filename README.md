# Estrutura Engenharia — Site institucional

Site premium de engenharia civil: HTML + CSS + JS puro, sem dependências de build.
Basta abrir o `index.html` no navegador (ou servir com qualquer servidor estático).

## Estrutura

```
eng-civil-premium/
├── index.html
└── assets/
    ├── css/
    │   ├── base.css         tokens, reset, utilitários, header
    │   ├── hero.css         hero, painel de planta técnica, trust bar
    │   ├── about.css        apresentação, especializações, indicadores
    │   ├── services.css     serviços e diferenciais
    │   ├── projects.css     portfólio + filtros
    │   ├── proof.css        depoimentos e credenciais
    │   ├── contact.css      CTA, contato, formulário, rodapé
    │   └── responsive.css   breakpoints 1120 / 980 / 760 / 420 e print
    └── js/
        └── main.js          header, menu, reveal, filtros, contadores, form
```

## Identidade visual

| Token | Valor | Uso |
|---|---|---|
| `--ink-950` | `#0B0E11` | fundos escuros, rodapé |
| `--ink-900` | `#11161C` | seções dark, títulos em botão |
| `--paper` | `#F7F6F3` | fundo claro principal |
| `--paper-warm` | `#EFEDE7` | seções alternadas |
| `--copper-500` | `#C08742` | acento (latão/cobre) |
| `--copper-400` | `#D2A163` | acento sobre fundo escuro |

Tipografia:
- **Archivo** — títulos (geométrica, técnica, alto impacto)
- **Inter** — corpo de texto (legibilidade em qualquer tamanho)
- **IBM Plex Mono** — labels, códigos, cotas, numeração de seção

Linguagem visual: malha de projeto, cotas, hachuras, desenho de planta em SVG,
numeração de seção (`DIF · 01`), chips monoespaçados e cantos retos (raio 4–8px)
para transmitir precisão em vez de suavidade.

## Seções

1. **Hero** — promessa, CTA duplo, indicadores animados e painel com planta estrutural em SVG
2. **Sobre** — apresentação profissional, especializações, citação, selo de 21 anos
3. **Serviços** — 6 competências com entregáveis listados
4. **Projetos** — 6 obras com filtro por categoria (residencial / corporativo / infraestrutura)
5. **Diferenciais** — 5 argumentos técnicos com sticky heading
6. **Depoimentos** — 3 clientes com cargo e empresa
7. **Credenciais** — timeline de formação, certificações e ficha técnica (CREA, ART)
8. **CTA + Contato** — dados, horário e formulário de briefing com validação
9. **Rodapé** — navegação, serviços, contato, redes e registro CREA

## Interatividade (`main.js`)

- Header muda de cor ao sair do hero (classe `is-stuck`)
- Menu mobile acessível (`aria-expanded`, fecha com Esc e ao clicar em link)
- Reveal on scroll via `IntersectionObserver` (respeita `prefers-reduced-motion`)
- Link ativo na navegação conforme a seção visível
- Filtros de projeto com `aria-pressed`
- Contadores animados nos indicadores
- Validação nativa do formulário + feedback de envio (demo local)
- Botão "voltar ao topo" e ano automático no rodapé

## Personalização rápida

- **Marca**: altere `.brand__name`, `.brand__sub` e o SVG `.brand__mark` (header e rodapé).
- **Cores**: mudar `--copper-500/400` propaga o acento em todo o site.
- **Conteúdo**: textos são estáticos no `index.html` — nenhuma dependência de framework.
- **Formulário**: para envio real, aponte o `<form>` para um endpoint (Formspree, Netlify Forms,
  API própria) e remova o `preventDefault` do bloco 7 em `main.js`.

## Acessibilidade & performance

- Skip link, foco visível, contraste AA nos textos principais
- `aria-label` em ícones e botões, `role`/`aria-pressed` nos controles
- Sem bibliotecas externas além das fontes Google
- Imagens inexistentes: toda a arte é SVG inline (sem requisições extras)
