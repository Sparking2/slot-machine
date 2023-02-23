import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { AppConfigInterface } from "../config";
import { Colors } from "../settings/colors";
import { Easing, Tween } from "@tweenjs/tween.js";

class Reel extends Container {
  private symbols: Sprite[] = [];
  // private ticker: Ticker;

  // @ts-ignore
  constructor(config: AppConfigInterface, ticker: Ticker) {
    super();
    const { symbolSize } = config;
    // this.ticker = ticker;

    const colorArray = [Colors.slot1, Colors.slot2, Colors.slot3, Colors.slot4];

    for (let i = 0; i < 4; i++) {
      const symbol = new Sprite(Texture.WHITE);
      symbol.tint = colorArray[Math.floor(Math.random() * colorArray.length)];
      symbol.width = symbolSize;
      symbol.height = symbolSize;
      symbol.y = i * symbolSize;
      this.symbols.push(symbol);
      this.addChild(symbol);
    }

    // DEBUG
    this.interactive = true;
    this.addEventListener("pointerdown", () => {
      const coords = { y: 0 };
      const tween = new Tween(coords)
        .to({ y: 300 }, 100)
        .easing(Easing.Quadratic.Out)
        .onUpdate(() => {
          this.symbols.forEach((item) => {
            item.y += coords.y;
          });
        });
      tween.start();
    });
  }
}

export default Reel;
