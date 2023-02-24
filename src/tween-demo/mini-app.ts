import { AnimateComponent, Dot } from "./tween";

export class miniApp {
  constructor() {
    requestAnimationFrame((_) => this.step());
    this.startDots(this.addDots());
  }

  addDots() {
    return new Dot(10);
  }

  startDots(dot: Dot) {
    const now = performance.now();
    dot.animateComponent = new AnimateComponent(dot, 100, 5, 0, 10);
    dot.animateComponent.start(now);
  }

  // @ts-ignore
  step(timestamp?: number) {
    requestAnimationFrame((time) => this.step(time));
  }
}
