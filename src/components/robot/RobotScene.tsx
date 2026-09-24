import { useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import type { OrthographicCamera } from "three";

import { RobotModel } from "./RobotModel";
import type { RobotLayout } from "./robotLayout";
import { useRobotScroll } from "./useRobotScroll";

/** Inclinação da câmera (graus): um leve "de cima" dá volume ao robô e à sombra. */
const TILT = 14 * (Math.PI / 180);
const DISTANCE = 20;

/**
 * Câmera ortográfica: 1 unidade de mundo = `zoom` px, então o tamanho do robô e o
 * mapeamento pista → pixel são exatos em qualquer tela, sem cortes nem perspectiva.
 */
function CameraRig({ layout }: { layout: RobotLayout }) {
  const camera = useThree((s) => s.camera) as OrthographicCamera;
  const height = useThree((s) => s.size.height);
  const invalidate = useThree((s) => s.invalidate);

  useLayoutEffect(() => {
    camera.zoom = layout.zoom;
    const targetY = height / 2 / layout.zoom - layout.bottomPad / layout.zoom;
    camera.position.set(0, targetY + DISTANCE * Math.sin(TILT), DISTANCE * Math.cos(TILT));
    camera.near = 0.1;
    camera.far = 60;
    camera.lookAt(0, targetY, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, height, layout.zoom, layout.bottomPad, invalidate]);

  return null;
}

interface Props {
  layout: RobotLayout;
  reduced: boolean;
  /** Chamado se o contexto WebGL for perdido — o robô se desativa. */
  onContextLost: () => void;
}

export default function RobotScene({ layout, reduced, onContextLost }: Props) {
  const scroll = useRobotScroll(!reduced);

  return (
    <Canvas
      orthographic
      frameloop={reduced ? "demand" : "always"}
      dpr={[1, 1.5]}
      camera={{ zoom: layout.zoom, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "default" }}
      className="animate-in fade-in duration-700"
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e) => {
            e.preventDefault();
            onContextLost();
          },
          { once: true },
        );
      }}
    >
      <CameraRig layout={layout} />

      {/* Luz: neutra para o corpo, com contraluz violeta (cor de destaque do portfólio). */}
      <ambientLight intensity={0.75} />
      <hemisphereLight args={["#dfe6ff", "#3a2f5c", 0.7]} />
      <directionalLight position={[3, 6, 6]} intensity={2.1} />
      <directionalLight position={[-5, 3, -4]} intensity={1.6} color="#8b6cff" />

      <RobotModel layout={layout} scroll={scroll} reduced={reduced} />
    </Canvas>
  );
}
