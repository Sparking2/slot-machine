import { Container, Graphics, IPointData, Texture, Ticker } from "pixi.js";
import { AppConfigInterface } from "../config";
import Tile from "./tile";
import { Easing, Tween } from "@tweenjs/tween.js";
import { Colors } from "../settings/colors";
import TileSlotType = Colors.TileSlotType;

class Reel extends Container {
  private tiles: Tile[] = [];
  private readonly spinSpeed: number;
  private slotTileSize: number;
  private ticker: Ticker;
  private shouldStop: boolean = false;
  private isInEnding;
  private endingTween: Tween<any>;

  constructor(
    config: AppConfigInterface,
    ticker: Ticker,
    position: IPointData,
    slots: number[],
    textures: any
  ) {
    super();
    this.slotTileSize = config.slotTileSize;
    this.spinSpeed = config.slotSpeed;

    const bg = new Graphics();
    bg.beginFill(0xffffff)
      .drawRect(0, 0, this.slotTileSize, this.slotTileSize * 3)
      .endFill();
    this.addChild(bg);

    this.height = this.slotTileSize * 3;
    this.position = position;

    for (let i = -1; i < 3; i++) {
      let tile: Tile;
      switch (slots[i + 1]) {
        case TileSlotType.A:
          tile = new Tile(this.slotTileSize, textures["apple.png"]);
          break;
        case TileSlotType.B:
          tile = new Tile(this.slotTileSize, textures["cherry.png"]);
          break;
        case TileSlotType.C:
          tile = new Tile(this.slotTileSize, textures["seven.png"]);
          break;
        case TileSlotType.D:
          tile = new Tile(this.slotTileSize, textures["watermelon.png"]);
          break;
        default:
          tile = new Tile(this.slotTileSize, Texture.WHITE);
      }
      tile.position = { x: 0, y: this.slotTileSize * i };
      this.addChild(tile);
      this.tiles.push(tile);
    }

    this.isInEnding = false;
    this.ticker = ticker;

    this.endingTween = new Tween({ y: 0 })
      .to({ y: this.slotTileSize }, 1000)
      .easing(Easing.Elastic.Out)
      .onStart(this.handleTweenStart)
      .onUpdate(this.handleTweenUpdate)
      .onComplete(this.handleTweenCompleted);
  }

  private handleTweenStart = () => {
    this.tiles.forEach((tile) => {
      tile.position.y -= this.slotTileSize;
      tile.lastVerticalPosition = tile.position.y;
    });
  };

  private handleTweenUpdate = (tweenValue: { y: number }) => {
    this.tiles.forEach((tile) => {
      tile.position.y = tile.lastVerticalPosition + tweenValue.y;
    });
  };

  private handleTweenCompleted = () => {
    this.tiles.forEach((tile) => {
      tile.lastVerticalPosition = 0;
    });
    this.isInEnding = false;
  };

  public spin = () => this.ticker.add(this.animation);

  public requestStop = () => (this.shouldStop = true);

  private tweenStart = (timestamp: number) => {
    this.endingTween.start(timestamp);
    this.isInEnding = true;
  };

  private tweenStep = (timestamp: number) => {
    if (!this.isInEnding) return;
    requestAnimationFrame((time) => this.tweenStep(time));
    this.endingTween.update(timestamp);
  };

  private animation = (deltaTime: number) => {
    this.moveTiles(deltaTime);
    this.moveLastTileToTop();
  };

  private moveTiles = (delta: number) => {
    this.tiles.forEach((item) => {
      item.y += delta * this.spinSpeed;
    });
  };

  private moveLastTileToTop = () => {
    this.tiles.every((item) => {
      if (!(item.position.y >= this.slotTileSize * 3)) return true;
      item.position.y = -this.slotTileSize;
      this.formatTiles(item);
      return false;
    });
  };

  private formatTiles = (topTile: Tile) => {
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

      const now = performance.now();
      this.tweenStart(now);
      this.tweenStep(now);
    }
  };
}

export default Reel;
