import Reel from "./components/Reel";
import { IAppConfig } from "./settings/Config";
import { NullType } from "./NullType";
import Button from "./components/Button/Button";
import { Ticker } from "pixi.js";

class GameManager {
  private _reels: Reel[] = [];
  set reels(value: Reel[]) {
    this._reels = value;
  }

  private _playButton: NullType<Button> = null;
  set playButton(value: Button) {
    this._playButton = value;
  }

  private readonly _gameTime: number;

  constructor(config: IAppConfig) {
    this._gameTime = config.gameTime;
  }

  public bindUI(reels: Reel[], playButton: Button) {
    this.playButton = playButton;
    this.reels = reels;
  }

  public startSpin() {
    if (this._reels.length == 0) return;

    const gameTimeSeconds = this._gameTime / 1000;
    const reelTime = gameTimeSeconds / this._reels.length;

    const spinReelTimer = (reel: Reel, index: number) => {
      let spinTime = 0;
      const delay = reelTime * (index + 1);
      reel.spin();
      const spinTick = (deltaTime: number) => {
        spinTime += (1 / 60) * deltaTime;
        if (spinTime > delay) {
          Ticker.shared.remove(spinTick);
          reel.requestStop();
        }
      };
      Ticker.shared.add(spinTick);
    };
    this._reels.forEach(spinReelTimer);

    let gameTimePast = 0;
    const gameTick = (deltaTime: number) => {
      gameTimePast += (1 / 60) * deltaTime;
      if (gameTimePast >= gameTimeSeconds) {
        Ticker.shared.remove(gameTick);
        this.enablePlayButton();
      }
    };
    Ticker.shared.add(gameTick);
  }

  private enablePlayButton = () => {
    if (!this._playButton) throw new Error("Button reference not set");
    this._playButton.setEnabled();
  };
}

export default GameManager;
