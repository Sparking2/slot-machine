import {
  Container,
  Graphics,
  IPointData,
  Sprite,
  Texture,
  Ticker,
} from "pixi.js";
import { AppConfigInterface } from "../config";
import Tile from "./tile";

class Reel extends Container {
  private tiles: Sprite[] = [];
  private ticker: Ticker;
  private shouldStop: boolean = false;

  constructor(
    config: AppConfigInterface,
    ticker: Ticker,
    position: IPointData,
    slots: number[]
  ) {
    super();
    const { symbolSize } = config;

    const bg = new Graphics();
    bg.beginFill(0xffffff)
      .drawRect(0, 0, symbolSize, symbolSize * 3)
      .endFill();
    this.addChild(bg);

    this.height = 100 * 3;

    this.position = position;

    // const colorArray = [Colors.slot1, Colors.slot2, Colors.slot3, Colors.slot4];
    for (let i = -1; i < 3; i++) {
      const tile = new Tile(symbolSize, slots[i + 1], Texture.WHITE);
      this.addChild(tile);
      this.tiles.push(tile);
    }

    this.ticker = ticker;
  }

  public spin(): void {
    this.ticker.add(this.animation);
  }

  public requestStop(): void {
    this.shouldStop = true;
  }

  private animation = (deltaTime: number) => {
    this.moveTiles(deltaTime);
    this.moveLastTileToTop();
  };

  private moveTiles(delta: number) {
    this.tiles.forEach((item) => {
      item.y += delta * 16;
    });
  }

  private moveLastTileToTop() {
    this.tiles.every((item) => {
      if (!(item.position.y >= 100 * 3)) return true;
      item.position.y = -100;
      this.formatTiles(item);
      return false;
    });
  }

  private formatTiles(topTile: Sprite) {
    const topTileIndex = this.tiles.indexOf(topTile);
    const length = this.tiles.length;
    const finalIndex = topTileIndex + length;

    let visibleTileIndex = 2;
    for (let i = topTileIndex; i < finalIndex; i++) {
      let currentItem = this.tiles[((i % length) + length) % length];
      if (currentItem == topTile) continue;

      if (visibleTileIndex == 0) currentItem.position.y = 200;
      else if (visibleTileIndex == 1) currentItem.position.y = 100;
      else if (visibleTileIndex == 2) currentItem.position.y = 0;
      visibleTileIndex--;
    }

    if (this.shouldStop) {
      this.ticker.remove(this.animation);
      this.shouldStop = false;
    }
  }
}

export default Reel;
