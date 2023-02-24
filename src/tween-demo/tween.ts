import { Container, DisplayObject, Graphics } from "pixi.js";
import { Easing, Tween } from "@tweenjs/tween.js";

export class Dot extends Container {
  // @ts-ignore
  get animateComponent(): AnimateComponent {
    if (this._animateComponent) return this._animateComponent;
  }

  set animateComponent(value: AnimateComponent) {
    this._animateComponent = value;
  }
  private _animateComponent: AnimateComponent | null = null;
  constructor(size: number) {
    super();
    const dot = new Graphics();
    dot.lineStyle(0);
    dot.beginFill(0xff0099, 0.6).drawCircle(0, 0, size).endFill();
    // @ts-ignore
    return dot;
  }
}

export class AnimateComponent {
  private readonly displayObject: DisplayObject;
  private readonly delay: number;
  private duration: number;
  private minX: number;
  private maxX: number;
  private isAnimating: boolean;
  private tween: Tween<object>;
  constructor(
    displayObject: DisplayObject,
    delay: number,
    duration: number,
    minX: number,
    maxX: number
  ) {
    this.displayObject = displayObject;
    this.delay = delay;
    this.duration = duration;
    this.minX = minX;
    this.maxX = maxX;
    this.isAnimating = false;

    this.tween = new Tween({ x: this.minX })
      .to({ x: this.maxX }, this.duration)
      .repeat(Infinity)
      .yoyo(true)
      .easing(Easing.Quadratic.InOut)
      .onUpdate((tweeningValue) => {
        console.log(tweeningValue.x);
      });
  }

  start(timestamp: number) {
    if (this.isAnimating) return;
    // const displayObject = this.displayObject;
    const now = timestamp + this.delay;
    setTimeout(() => {
      this.tween.start(now);
      // this.tween = new Tween({ x: this.minX })
      //   .to({ x: this.maxX }, this.duration)
      //   .repeat(Infinity)
      //   .yoyo(true)
      //   .easing(Easing.Quadratic.InOut)
      //   .onUpdate(function onUpdate() {
      //     displayObject.x = this.x;
      //   })
      //   .start(now);
      this.isAnimating = true;
      this.step(now);
    }, this.delay);
  }

  stop() {
    if (!this.isAnimating) return;
    this.isAnimating = false;
    this.tween.stop();
    this.reset();
  }
  reset() {
    this.displayObject.x = 0;
  }
  step(timestamp: number) {
    if (this.isAnimating) requestAnimationFrame((time) => this.step(time));
    this.tween.update(timestamp);
  }
}
