# Palheta Engenharia - Site institucional

Site de engenharia civil (HTML + CSS + JS puro, sem build). Abra o `index.html`
ou sirva a pasta com qualquer servidor estatico.

## Estrutura

```
eng-civil-premium/
├── index.html
├── DESIGN.md                 referencia visual (terminal DeFi: dark + mint)
├── assets/
│   ├── css/
│   │   ├── site.css          BUNDLE usado pelo index.html
│   │   └── _src/             parciais editaveis (base, hero, about, services,
│   │                         projects, proof, contact, responsive)
│   ├── js/main.js            header, menu, reveal, filtros, contadores, form
│   └── img/                  imagens das obras
```

> `site.css` e gerado a partir de `_src/*.css` na ordem: base, hero, about,
> services, projects, proof, contact, responsive. Edite os parciais e re-gere.

## Identidade visual (DESIGN.md)

| Token | Valor | Uso |
|---|---|---|
| `--color-abyss` | `#0a0a0a` | canvas da pagina e de todas as secoes |
| `--color-carbon` | `#171717` | cards e paineis |
| `--color-graphite` | `#222222` | bordas hairline e divisores |
| `--color-ash` | `#9b9b9b` | texto secundario |
| `--color-chalk` | `#ffffff` | texto principal e pilula do header |
| `--color-signal-mint` | `#3fe280` | unicamente CTA primario, nav ativo e borda de card de dado vivo |

Tipografia:
- **Space Grotesk 400** - substituta do Aeonik no display (h1, 1x por pagina, tracking -0.025em)
- **Inter 400/500** - todo o restante da UI, sempre com `letter-spacing: 0.05em`

Regras: sem gradientes decorativos, sem drop shadows em cards (so `--shadow-subtle`
no CTA), raio 12px em cards / 16px em botoes / 9999px em pilulas / 64px no hero.
```

## Contato

- **Eng. Fabricio Palheta** - responsavel tecnico, CREA ativo
- WhatsApp: **+55 91 98093-6447** (`wa.me` com mensagem pronta)
- Instagram: `@palhetaengenharia`
- Atuacao: Belem e regiao - PA
