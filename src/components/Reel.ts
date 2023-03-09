import { BlurFilter, Container, Graphics, IPointData, Ticker } from "pixi.js";
import { IAppConfig } from "../settings/Config";
import Symbol from "./Symbol";
import {Easing, Tween} from "@tweenjs/tween.js";
import { ESymbolSlotType } from "../constants/ESymbolSlotType";

class Reel extends Container {
  private symbols: Symbol[];
  private spinSpeed: number;
  private symbolSize: number;
  private filter: BlurFilter;
  private ticker: Ticker;
  private shouldStop: boolean;
  private isInEnding;
  private endingTween: Tween<any>;

  constructor(
    config: IAppConfig,
    ticker: Ticker,
    position: IPointData,
    textures: any,
    reelSymbols: ESymbolSlotType[]
  ) {
    super();
    this.symbolSize = config.slotSymbolSize;
    this.spinSpeed = config.slotSpeed;
    this.symbols = [];

    const bg = new Graphics();
    const bgHeight = this.symbolSize * (reelSymbols.length - 2);
    bg.beginFill(0xffffff)
      .drawRect(0, 0, this.symbolSize, bgHeight)
      .endFill();
    this.addChild(bg);

    for (let i = 0; i < reelSymbols.length; i++) {
      const textureName = config.slotSymbolTextures.get(reelSymbols[i]);
      if (typeof textureName == "undefined") continue;
      const symbol: Symbol = new Symbol(this.symbolSize, textures[textureName]);
      symbol.position = { x: 0, y: this.symbolSize * i - this.symbolSize };
      this.addChild(symbol);
      this.symbols.push(symbol);
    }

    this.isInEnding = false;
    this.ticker = ticker;

    this.endingTween = new Tween({ y: 0 })
      .to({ y: this.symbolSize }, 1000)
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
    this.symbols.forEach((symbol) => {
      symbol.position.y -= this.symbolSize;
      symbol.lastVerticalPosition = symbol.position.y;
    });
  };

  private handleTweenUpdate = (tweenValue: { y: number }) => {
    this.symbols.forEach((symbol) => {
      symbol.position.y = symbol.lastVerticalPosition + tweenValue.y;
    });
  };

  private handleTweenCompleted = () => {
    this.symbols.forEach((symbol) => {
      symbol.lastVerticalPosition = 0;
    });
    this.isInEnding = false;
    this.ticker.remove(this.tweenStep);
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
    this.ticker.add(this.tweenStep)
  };

  private tweenStep = () => {
    if(!this.isInEnding) return;
    const time = performance.now();
    this.endingTween.update(time);
  }

  private animation = (deltaTime: number) => {
    this.moveSymbols(deltaTime);
    this.moveLastSymbolToTop();
  };

  private moveSymbols = (delta: number) => {
    this.symbols.forEach((item) => {
      item.y += delta * this.spinSpeed;
    });
  };

  private moveLastSymbolToTop = () => {
    const maxDistance = (this.symbols.length - 1) * this.symbolSize;
    this.symbols.every((item) => {
      if (!(item.position.y >= maxDistance)) return true;
      item.position.y = -this.symbolSize;
      this.formatSymbols(item);
      return false;
    });
  };

  private formatSymbols = (topSymbol: Symbol) => {
    const topSymbolIndex = this.symbols.indexOf(topSymbol);
    const length = this.symbols.length;
    const finalIndex = topSymbolIndex + length;

    let visibleSymbolsIndex = 0;
    for (let i = topSymbolIndex; i < finalIndex; i++){
      const currentItem = this.symbols[((i % length) + length) % length];
      if(currentItem == topSymbol) continue;

      currentItem.position.y = visibleSymbolsIndex * this.symbolSize;
      visibleSymbolsIndex++;
    }

    if (this.shouldStop) {
      this.ticker.remove(this.animation);
      this.shouldStop = false;

      const now = performance.now();
      this.tweenStart(now);
    }
  };
}

export default Reel;
