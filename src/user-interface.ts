import { pixiApp } from "./components/pixi-app";
import { Assets, Container, Graphics, Ticker } from "pixi.js";
import { IAppConfig } from "./config";
import FpsDisplay from "./components/fps-display";
import Reel from "./components/reel";
import GameManager from "./game-manager";
import Button from "./components/Button/Button";

class UserInterface {
  mainContainer: Container;
  fpsCounter: FpsDisplay;
  private readonly _playButton: Button;
  get playButton(): Button {
    return this._playButton;
  }
  public reels: Reel[];

  constructor(config: IAppConfig, ticker: Ticker, gameManager: GameManager) {
    this.reels = [];

    const mainContainer = new Container();
    const fps = new FpsDisplay(config, ticker);
    mainContainer.addChild(fps);

    const playButtonData = config.playButtonSettings;
    playButtonData.callback = () => {
      gameManager.startSpin();
    };
    const playBtn = new Button(playButtonData);
    mainContainer.addChild(playBtn);
    this._playButton = playBtn;

    const slotsContainer = new Container();

    loadTexture(config.slotTexturePath).then((result) => {
      for (let i = 0; i < config.slotCount; i++) {
        const x = (config.slotPadding + config.slotTileSize) * i;
        const position = { x: x, y: 0 };
        const tiles = config.slotTiles[i];
        const reel = new Reel(config, ticker, position, tiles, result);
        slotsContainer.addChild(reel);
        this.reels.push(reel);
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
  }
}

async function loadTexture(url: string) {
  const loadedTexture = await Assets.load(url);
  return loadedTexture["textures"];
}

export default UserInterface;
