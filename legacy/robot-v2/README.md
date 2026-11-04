# Robô NODE-01 (v2) e HeroStage — desativados

Removidos do site quando o Hero virou tipográfico (`src/components/Hero.tsx`).
Nada aqui é importado nem servido: a pasta fica fora de `src/` e de `public/`.

- `ContextualRobot.tsx`, `robotConfig.ts`: renderização/posicionamento (dependia de `@google/model-viewer`, também removido do `package.json`).
- `node-bot.glb`: era `public/models/node-bot.glb`.
- `tools/build_robot.py`: gerador do modelo.
- `../hero-stage-v2/HeroStage.tsx`: janelas flutuantes de projetos do Hero antigo.
