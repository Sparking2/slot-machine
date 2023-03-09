import Reel from "../components/Reel";
import { IAppConfig } from "../settings/Config";
import Button from "../components/Button/Button";
import { Ticker } from "pixi.js";

class GameManager {
  public reels?: Reel[];
  public playButton?: Button;
  private _gameTime: number;

  constructor(config: IAppConfig) {
    this._gameTime = config.gameTime;
  }

  public startSpin() {
    if (!this.reels || this.reels.length == 0) return;

    const gameTimeSeconds = this._gameTime / 1000;
    const reelTime = gameTimeSeconds / this.reels.length;

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
    this.reels.forEach(spinReelTimer);

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
    if (!this.playButton) throw new Error("Button reference not set");
    this.playButton.setEnabled();
  };
}

export default GameManager;
