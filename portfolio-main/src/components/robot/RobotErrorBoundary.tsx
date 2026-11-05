import { Component, type ReactNode } from "react";

/**
 * Isola o robô do resto do site: se o WebGL, o R3F ou o carregamento do GLB falharem,
 * o portfólio continua normal e o robô simplesmente não aparece.
 */
export class RobotErrorBoundary extends Component<
  { children: ReactNode; onError?: () => void },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch(error: unknown) {
    console.warn("[robot] desativado após falha:", error);
    this.props.onError?.();
  }

  override render() {
    return this.state.failed ? null : this.props.children;
  }
}
