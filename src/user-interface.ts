import { pixiApp } from "./components/pixi-app";
import { Assets, Container, Graphics, Ticker } from "pixi.js";
import { IAppConfig } from "./settings/Config";
import FpsLabel from "./components/FpsLabel/FpsLabel";
import Reel from "./components/Reel";
import Button from "./components/Button/Button";
import { IFpsConfig } from "./components/FpsLabel/IFpsConfig";
import { IButtonData } from "./components/Button/IButtonData";

class UserInterface {
  private readonly mainContainer?: Container;
  public playButton?: Button;
  private ticker: Ticker;
  public reels: Reel[];

  constructor(config: IAppConfig, ticker: Ticker) {
    this.reels = [];
    this.ticker = ticker;

    const mainContainer = new Container();

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

  public createFPSLabel(config: IFpsConfig) {
    const fps = new FpsLabel(config, this.ticker);
    this.mainContainer?.addChild(fps);
  }

  public createPlayButton(config: IButtonData, playButtonCallback: Function) {
    const playButtonData = config;
    playButtonData.callback = playButtonCallback;
    const playBtn = new Button(playButtonData);
    this.mainContainer?.addChild(playBtn);
    this.playButton = playBtn;
  }
}

async function loadTexture(url: string) {
  const loadedTexture = await Assets.load(url);
  return loadedTexture["textures"];
}

export default UserInterface;
