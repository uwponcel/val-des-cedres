import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Catches any failure in the WebGL subtree (unsupported context, shader error)
 * and renders nothing, so the static 2D image underneath remains the fallback.
 */
export class WebGLBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('[webgl] disabled, falling back to static image:', error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
