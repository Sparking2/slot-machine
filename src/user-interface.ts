import { pixiApp } from "./components/pixi-app";
import { Container, Ticker } from "pixi.js";
import { AppConfigInterface } from "./config";
import FpsDisplay from "./components/fps-display";
import PlayButton from "./components/play-button";
import Reel from "./components/reel";
import GameManager from "./game-manager";

class UserInterface {
  mainContainer: Container;
  fpsCounter: FpsDisplay;
  private readonly _playButton: PlayButton;
  get playButton(): PlayButton {
    return this._playButton;
  }
  private _reels: Reel[] = [];
  get reels(): Reel[] {
    return this._reels;
  }

  constructor(
    config: AppConfigInterface,
    ticker: Ticker,
    gameManager: GameManager
  ) {
    const container = new Container();
    // this.mainContainer = new Container();
    const fps = new FpsDisplay(config, ticker);
    container.addChild(fps);

    const playBtn = new PlayButton(config, gameManager);
    container.addChild(playBtn);

    config.slotPositions.forEach((position) => {
      const reel = new Reel(config, ticker, position);
      container.addChild(reel);
      this._reels.push(reel);
    });

    this.fpsCounter = fps;
    this.mainContainer = container;
    this._playButton = playBtn;

    pixiApp.stage.addChild(this.mainContainer);
  }
}

export default UserInterface;

// let originalView: number[];
// let mainContainer: Container;
// let fpsCounter: FpsDisplay;
// let playButton: PlayButton;

// export function init(
//   config: AppConfigInterface,
//   ticker: Ticker,
//   gameManager: GameManager
// ) {
//   originalView = [config.viewWidth, config.viewHeight];
//
//   mainContainer = new Container();
//
//   fpsCounter = new FpsDisplay(config, ticker);
//   mainContainer.addChild(fpsCounter);
//
//   playButton = new PlayButton(config, gameManager.startSpin);
//   mainContainer.addChild(playButton);
//
//   const reel = new Reel(config, ticker);
//   mainContainer.addChild(reel);
//
//   pixiApp.stage.addChild(mainContainer);
//   window.addEventListener("resize", resize);
//   resize();
// }

// function resize(): void {
//   const ratio = originalView[0] / originalView[1];
//
//   let w = 0;
//   let h = 0;
//
//   if (pixiApp.view.width / pixiApp.view.height >= ratio) {
//     w = pixiApp.view.height * ratio;
//     h = pixiApp.view.height;
//   } else {
//     w = pixiApp.view.height;
//     h = pixiApp.view.height / ratio;
//   }
//
//   mainContainer.children.forEach((element) => {
//     if (!("resize" in element)) return;
//     if (!(typeof element.resize === "function")) return;
//     element.resize(w, h);
//   });
// }
