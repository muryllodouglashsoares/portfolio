# Hero v1 — janela de código (desativada)

`HeroConsole.tsx` (painel "muryllo.ts" com digitação) e `removed-from-index.css`
(regras `.hero-console*`, `.console-footer`, `.code-*`) foram retirados do site quando o
Hero passou a usar `HeroStage` + robô NODE-01. Nada aqui entra no build.
Para restaurar: devolver o componente a `src/components/`, as regras ao `index.css`
e trocar `<HeroStage />` por `<HeroConsole />` em `App.tsx`.
