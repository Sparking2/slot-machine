import { Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import { AppConfigInterface } from "../config";
import { Colors } from "../settings/colors";

class Reel extends Container {
  private symbols: Sprite[] = [];
  private Ypositions: number[] = [];
  // private ticker: Ticker;

  // @ts-ignore
  constructor(config: AppConfigInterface, ticker: Ticker) {
    super();
    const { symbolSize } = config;
    // this.ticker = ticker;

    const bg = new Graphics();
    bg.beginFill(0xffffff)
      .drawRect(0, 0, symbolSize, symbolSize * 3)
      .endFill();
    this.addChild(bg);

    this.height = 100 * 3;

    this.position.set(640, 360);

    const colorArray = [Colors.slot1, Colors.slot2, Colors.slot3, Colors.slot4];
    for (let i = -1; i < 3; i++) {
      const symbol = new Sprite(Texture.WHITE);
      // symbol.tint = colorArray[Math.floor(Math.random() * colorArray.length)];
      symbol.tint = colorArray[i + 1];
      symbol.width = symbolSize;
      symbol.height = symbolSize;
      symbol.y = symbolSize * i;
      this.addChild(symbol);
      this.symbols.push(symbol);
      this.Ypositions.push(symbol.position.y);
    }

    // DEBUG
    this.interactive = true;
    this.addEventListener("pointerdown", () => {
      ticker.add(this.animation);
    });
  }

  animation = (deltaTime: number) => {
    this.moveTiles(deltaTime);
    this.moveLastTileToTop();
  };

  private moveTiles(delta: number) {
    this.symbols.forEach((item) => {
      item.y += delta * 16;
    });
  }

  private moveLastTileToTop() {
    this.symbols.every((item) => {
      if (!(item.position.y >= 100 * 3)) return true;
      item.position.y = -100;
      this.formatTiles(item);
      return false;
    });
  }

  private formatTiles(topTile: Sprite) {
    const topTileIndex = this.symbols.indexOf(topTile);
    const length = this.symbols.length;
    const finalIndex = topTileIndex + length;

    let hasd = 2;
    for (let i = topTileIndex; i < finalIndex; i++) {
      let currentItem = this.symbols[((i % length) + length) % length];
      console.log(currentItem.tint);
      if (currentItem == topTile) continue;

      if (hasd == 0) currentItem.position.y = 200;
      else if (hasd == 1) currentItem.position.y = 100;
      else if (hasd == 2) currentItem.position.y = 0;
      hasd--;
    }
  }
}

export default Reel;
