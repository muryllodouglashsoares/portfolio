# Portfólio — Muryllo Douglas Henrique Soares

Portfólio profissional desenvolvido em **HTML5, CSS3 e JavaScript puro** (sem frameworks), criado para apresentar minha trajetória como estudante de Ensino Médio Integrado ao Técnico em Informática, meus projetos e minha evolução técnica.

🔗 **Live:** publique via GitHub Pages (veja abaixo) e cole o link aqui.

## Objetivo

Apresentar projetos, habilidades técnicas e evolução de forma organizada, servindo como currículo online e ponto de contato para recrutadores, professores e futuros clientes.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis nativas, grid, flexbox, animações)
- JavaScript vanilla (ES6+, sem bibliotecas ou build step)

## Funcionalidades

- Navbar fixa com destaque de seção ativa e menu responsivo
- Efeito de digitação no hero
- Scroll reveal e contadores animados
- Projetos carregados de `data/projects.json`, com filtro por categoria
- Linha do tempo carregada de `data/timeline.json`
- Seção de certificados preparada para receber itens futuros
- Formulário de contato (abre o cliente de e-mail com a mensagem pronta)
- Totalmente responsivo (desktop, tablet, celular)
- Acessível: HTML semântico, `:focus-visible`, ARIA nos controles interativos, `prefers-reduced-motion` respeitado

## Estrutura de pastas

```
portfolio/
├── index.html
├── README.md
├── LICENSE
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── css/        variables.css, style.css, animations.css, responsive.css
│   ├── js/         navbar.js, animations.js, typing.js, projects.js, theme.js, main.js
│   ├── images/      profile/, projects/, backgrounds/, icons/
│   ├── fonts/
│   └── downloads/   currículo em PDF
├── data/
│   ├── projects.json
│   ├── certificates.json
│   └── timeline.json
├── docs/            screenshots, wireframes
└── .github/workflows/deploy.yml
```

## Como executar localmente

Os dados dos projetos e da timeline são carregados via `fetch()` de arquivos JSON. Isso **não funciona** abrindo o `index.html` direto no navegador (protocolo `file://`) — nesse caso, o site usa automaticamente uma cópia de segurança embutida no JavaScript, então tudo continua funcionando, mas para editar os dados normalmente é melhor rodar um servidor local:

```bash
# Python
python3 -m http.server 8080

# ou Node
npx serve .
```

Depois acesse `http://localhost:8080`.

## Como publicar no GitHub Pages

1. Suba este repositório para o GitHub (branch `main`).
2. Em **Settings → Pages**, selecione a origem **GitHub Actions** (o workflow em `.github/workflows/deploy.yml` já está pronto).
3. A cada push na `main`, o site é publicado automaticamente.
4. Atualize a URL em `sitemap.xml`, `robots.txt` e na tag `<link rel="canonical">` do `index.html` para o endereço real do seu Pages.

## Atualizando o conteúdo

- **Projetos:** edite `data/projects.json` (e a cópia `FALLBACK_PROJECTS` no topo de `assets/js/projects.js`, para manter consistência offline).
- **Timeline:** edite `data/timeline.json` (mesma lógica de fallback em `assets/js/main.js`).
- **Certificados:** adicione itens em `data/certificates.json` conforme forem concluídos.
- **Currículo:** substitua o arquivo em `assets/downloads/curriculo-muryllo-douglas.pdf`.

## Licença

Distribuído sob a licença MIT — veja [LICENSE](LICENSE).

## Contato

- GitHub: [github.com/muryllodouglashsoares](https://github.com/muryllodouglashsoares)
- LinkedIn: [Muryllo Douglas Henrique Soares](https://www.linkedin.com/in/muryllo-douglas-henrique-soares-7a8416416/)
- E-mail: muryllodouglash.soares@gmail.com
