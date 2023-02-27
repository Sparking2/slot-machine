import { Sprite, Texture } from "pixi.js";

class SlotTile extends Sprite {
  constructor(size: number, color: number, texture: Texture) {
    super(texture);

    this.tint = color;
    this.width = size;
    this.height = size;
  }
}

export default SlotTile;
