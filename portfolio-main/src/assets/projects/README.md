# Capturas dos projetos

Coloque as imagens na pasta do projeto correspondente:

| Pasta                | Projeto         |
| -------------------- | --------------- |
| `lexcontract/`       | LexContract     |
| `evidence-finder/`   | Evidence Finder |
| `gitflow-desktop/`   | GitFlow Desktop |
| `tekidu/`            | Tekidu          |

Regras:

- Formatos aceitos: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`.
- `cover.<ext>` (ex.: `cover.webp`) é a imagem exibida no card do projeto.
- As demais imagens aparecem na galeria ao ampliar. A ordem é alfabética:
  use `01-dashboard.webp`, `02-contratos.webp`… para controlar a sequência.
- Sem nenhuma imagem local, o site usa a captura remota antiga (se houver) ou
  o aviso "Captura real será adicionada".
- Proporção recomendada: 16:10, largura mínima de 1600 px. Prefira `.webp`.
- Não é preciso mexer em código: salve, rode `pnpm build` e faça o commit.
