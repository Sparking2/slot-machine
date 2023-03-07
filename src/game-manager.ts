import Reel from "./components/reel";
import { IAppConfig } from "./config";
import { NullType } from "./NullType";
import Button from "./components/Button/Button";

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
    const reelTime = this._gameTime / this._reels.length;
    this._reels.forEach((reel, index) => {
      reel.spin();
      const delay = reelTime * (index + 1);
      setTimeout(() => {
        reel.requestStop();
      }, delay);
    });
    setTimeout(this.enablePlayButton, this._gameTime);
  }

  private enablePlayButton = () => {
    if (!this._playButton) throw new Error("Button reference not set");
    this._playButton.setEnabled();
  };
}

export default GameManager;
