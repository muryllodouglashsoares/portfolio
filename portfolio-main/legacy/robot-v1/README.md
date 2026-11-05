# Robô v1 (desativado temporariamente)

Implementação anterior do personagem 3D, **preservada** para recuperação futura.
Nada aqui é importado pelo site: esta pasta fica fora de `src/` (não entra no build)
e fora de `public/` (não é servida).

| Arquivo | Origem |
| --- | --- |
| `robot.glb` | era `public/robot.glb` |
| `ContextualRobot.tsx` | era `src/components/ContextualRobot.tsx` |
| `robot-v1.css` | regras `.robot-*` extraídas de `src/index.css` (as linhas `display: none` repetidas vinham dos blocos `@media (max-width: 600px)` e `prefers-reduced-motion`) |

## Como restaurar

1. `legacy/robot-v1/robot.glb` → `public/robot.glb`
2. `legacy/robot-v1/ContextualRobot.tsx` → `src/components/ContextualRobot.tsx`
3. Devolver as regras de `robot-v1.css` a `src/index.css` (e remover as `.robot-*` novas)
4. Em `App.tsx`, importar `ContextualRobot`/`getRobotSide` de `./components/ContextualRobot`
   no lugar de `./components/robot/ContextualRobot`.

Nunca monte as duas versões ao mesmo tempo.
