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

    config.slotPositions.forEach((position, index) => {
      const reel = new Reel(config, ticker, position, config.slotTiles[index]);
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
