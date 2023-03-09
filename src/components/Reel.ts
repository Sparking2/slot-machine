import { BlurFilter, Container, Graphics, IPointData, Ticker } from "pixi.js";
import { IAppConfig } from "../settings/Config";
import Tile from "./Tile";
import { Easing, Tween } from "@tweenjs/tween.js";
import { ETileSlotType } from "../constants/ETileSlotType";

class Reel extends Container {
  private readonly tiles: Tile[];
  private readonly spinSpeed: number;
  private readonly slotTileSize: number;
  private readonly filter: BlurFilter;
  private ticker: Ticker;
  private shouldStop: boolean;
  private isInEnding;
  private endingTween: Tween<any>;

  constructor(
    config: IAppConfig,
    ticker: Ticker,
    position: IPointData,
    textures: any,
    reelTiles: ETileSlotType[]
  ) {
    super();
    this.slotTileSize = config.slotTileSize;
    this.spinSpeed = config.slotSpeed;
    this.tiles = [];

    const bg = new Graphics();
    const bgHeight = this.slotTileSize * (reelTiles.length - 2);
    bg.beginFill(0xffffff)
      .drawRect(0, 0, this.slotTileSize, bgHeight)
      .endFill();
    this.addChild(bg);

    for (let i = 0; i < reelTiles.length; i++) {
      const textureName = config.slotTilesTextures.get(reelTiles[i]);
      if (typeof textureName == "undefined") continue;
      const tile: Tile = new Tile(this.slotTileSize, textures[textureName]);
      tile.position = { x: 0, y: this.slotTileSize * i - this.slotTileSize };
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

    this.filter = new BlurFilter();
    this.filter.enabled = false;
    this.filters = [this.filter];

    this.shouldStop = false;

    this.position = position;
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

  public spin = () => {
    this.ticker.add(this.animation);
    this.filter.enabled = true;
  };

  public requestStop = () => {
    this.filter.enabled = false;
    this.shouldStop = true;
  };

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
      if (!(item.position.y >= this.slotTileSize * 4)) return true;
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
