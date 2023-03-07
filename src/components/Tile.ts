import { Sprite, Texture } from "pixi.js";

class SlotTile extends Sprite {
  private _lastVerticalPosition: number;

  get lastVerticalPosition(): number {
    return this._lastVerticalPosition;
  }

  set lastVerticalPosition(value: number) {
    this._lastVerticalPosition = value;
  }

  constructor(size: number, texture: Texture) {
    super(texture);

    this.width = size;
    this.height = size;

    this._lastVerticalPosition = 0;
  }
}

export default SlotTile;
