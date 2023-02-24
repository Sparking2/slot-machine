import { Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import { AppConfigInterface } from "../config";
import { Colors } from "../settings/colors";
import { Easing, Tween } from "@tweenjs/tween.js";

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

    // for (let i = -1; i < 3; i++) {
    //   const symbol = new Sprite(Texture.WHITE);
    //   symbol.tint = colorArray[Math.floor(Math.random() * colorArray.length)];
    //   symbol.width = symbolSize;
    //   symbol.height = symbolSize;
    //   symbol.y = i * symbolSize;
    //   this.symbols.push(symbol);
    //   this.addChild(symbol);
    // }

    // DEBUG
    this.interactive = true;
    // this.addEventListener("pointerdown", () => {
    //   const animation = () => {
    //     this.symbols.forEach((item) => {
    //       item.y += 0.16 * 10;
    //       if (item.position.y >= symbolSize * 3) item.position.y = -symbolSize;
    //     });
    //   };
    //   ticker.add(animation);
    //   setTimeout(() => {
    //     ticker.remove(animation);
    //     this.checkBounds();
    //   }, 10000);
    // });

    let isAnimating = false;

    const tween = new Tween({ y: 0 })
      .to({ y: 10 }, 16)
      .repeat(Infinity)
      .easing(Easing.Linear.None)
      .onUpdate((value) => {
        this.symbols.forEach((item) => {
          item.position.y += value.y;
        });
      })
      .onRepeat(() => {
        this.symbols.forEach((item) => {
          if (item.position.y >= 300) item.position.y = -100;
        });
      })
      .onComplete(() => {
        console.log("finished");
        this.symbols[0].position.y = -100;
      })
      .start();

    const step = (timestamp: number) => {
      requestAnimationFrame((time) => step(time));
      tween.update(timestamp);
    };

    this.addEventListener("pointerdown", () => {
      if (!isAnimating) {
        const now = performance.now();
        step(now);
        isAnimating = true;
      } else {
        tween.stop();
        isAnimating = false;
      }
    });
  }

  checkBounds() {
    // const length = this.symbols.length - 1;
    this.symbols.forEach((item, _) => {
      let boundEnd = item.position.y + item.height;

      if (boundEnd > 0 && boundEnd < 100) {
        item.position.y = 0;
        return;
      }
      if (boundEnd > 100 && boundEnd < 100 * 2) {
        item.position.y = 100;
        return;
      }
      if (boundEnd > 100 * 2 && boundEnd < 100 * 3) {
        item.position.y = 200;
        return;
      }
      if (boundEnd > 100 * 3) {
        // over the limit?
        item.position.y = -100;
        // let nextItem = this.symbols[((index % length) + length) % length];
        // nextItem.position.y = this.Ypositions[1];
      }
    });
  }
}

export default Reel;
