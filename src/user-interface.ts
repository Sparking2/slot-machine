import { pixiApp } from "./components/pixi-app";
import { Assets, Container, Graphics, Ticker } from "pixi.js";
import { AppConfigInterface } from "./config";
import FpsDisplay from "./components/fps-display";
import PlayButton from "./components/play-button";
import Reel from "./components/reel";
import GameManager from "./game-manager";
import { MotionBlurFilter } from "pixi-filters";

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

  private readonly _filter: MotionBlurFilter;
  get filter(): MotionBlurFilter {
    return this._filter;
  }

  constructor(
    config: AppConfigInterface,
    ticker: Ticker,
    gameManager: GameManager
  ) {
    const mainContainer = new Container();
    const fps = new FpsDisplay(config, ticker);
    mainContainer.addChild(fps);

    const playBtn = new PlayButton(config, gameManager);
    mainContainer.addChild(playBtn);

    const slotsContainer = new Container();

    loadTexture(config.slotTexturePath).then((result) => {
      for (let i = 0; i < config.slotCount; i++) {
        const x = (config.slotPadding + config.slotTileSize) * i;
        const position = { x: x, y: 0 };
        const tiles = config.slotTiles[i];
        const reel = new Reel(config, ticker, position, tiles, result);
        slotsContainer.addChild(reel);
        this._reels.push(reel);
      }

      const slotContainerHeight = slotsContainer.height - config.slotTileSize;
      slotsContainer.pivot.set(
        slotsContainer.width / 2,
        slotContainerHeight / 2
      );
      slotsContainer.position.set(640, 360);
      mainContainer.addChild(slotsContainer);
    });

    this.fpsCounter = fps;
    this.mainContainer = mainContainer;
    this._playButton = playBtn;

    pixiApp.stage.addChild(this.mainContainer);

    const containerMask = new Graphics();
    const maskWidth =
      (config.slotPadding + config.slotTileSize) * config.slotCount;
    const maskHeight = config.slotTileSize * 3;
    containerMask
      .beginFill(0x660000)
      .drawRect(0, 0, maskWidth, maskHeight)
      .endFill();
    containerMask.pivot.set(containerMask.width / 2, containerMask.height / 2);
    containerMask.position.set(640, 360);
    pixiApp.stage.addChild(containerMask);
    slotsContainer.mask = containerMask;

    this._filter = new MotionBlurFilter([0, 0], 25);
    this._filter.enabled = true;
    containerMask.filters = [this._filter];
  }
}

async function loadTexture(url: string) {
  const loadedTexture = await Assets.load(url);
  return loadedTexture["textures"];
}

export default UserInterface;
