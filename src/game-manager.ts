import Reel from "./components/reel";
import { AppConfigInterface } from "./config";
import PlayButton from "./components/play-button";
import { NullType } from "./NullType";

class GameManager {
  private _reels: Reel[] = [];
  set reels(value: Reel[]) {
    this._reels = value;
  }

  private _playButton: NullType<PlayButton> = null;
  set playButton(value: PlayButton) {
    this._playButton = value;
  }

  private readonly _gameTime: number;

  constructor(config: AppConfigInterface) {
    this._gameTime = config.gameTime;
  }

  public bindUI(reels: Reel[], playButton: PlayButton) {
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
