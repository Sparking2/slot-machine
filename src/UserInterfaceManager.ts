import { pixiApp } from "./components/pixi-app";
import { Assets, Container, Graphics, Ticker } from "pixi.js";
import { IAppConfig } from "./settings/Config";
import FpsLabel from "./components/FpsLabel/FpsLabel";
import Reel from "./components/Reel";
import Button from "./components/Button/Button";
import { IFpsConfig } from "./components/FpsLabel/IFpsConfig";
import { IButtonData } from "./components/Button/IButtonData";

class UserInterfaceManager {
  private readonly mainContainer?: Container;
  private readonly slotsContainer?: Container;
  private readonly ticker: Ticker;

  public playButton?: Button;
  public reels: Reel[];

  private loadedTextures?: Object;

  constructor(ticker: Ticker) {
    this.reels = [];
    this.ticker = ticker;
    this.mainContainer = new Container();
    this.slotsContainer = new Container();
    this.mainContainer.addChild(this.slotsContainer);
    pixiApp.stage.addChild(this.mainContainer);
  }

  // Should I just move all of this functions outside the class?

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

  public async loadTexture(url: string) {
    const loadedTexture = await Assets.load(url);
    this.loadedTextures = loadedTexture["textures"];
  }

  public createReels(config: IAppConfig) {
    if (!this.slotsContainer) return;

    const slotsContainer = this.slotsContainer;

    for (let i = 0; i < config.slotCount; i++) {
      const x = (config.slotPadding + config.slotTileSize) * i;
      const position = { x: x, y: 0 };
      const tiles = config.slotTilesTemp[i];
      const reel = new Reel(
        config,
        this.ticker,
        position,
        tiles,
        this.loadedTextures
      );
      slotsContainer.addChild(reel);
      this.reels.push(reel);
    }

    const slotContainerHeight = slotsContainer.height - config.slotTileSize;
    slotsContainer.pivot.set(slotsContainer.width / 2, slotContainerHeight / 2);
    slotsContainer.position.set(config.viewWidth / 2, config.viewHeight / 2);
  }

  public createReelMask(config: IAppConfig) {
    const containerMask = new Graphics();
    const maskWidth =
      (config.slotPadding + config.slotTileSize) * config.slotCount;
    const maskHeight = config.slotTileSize * 3;
    containerMask
      .beginFill(0x660000)
      .drawRect(0, 0, maskWidth, maskHeight)
      .endFill();
    containerMask.pivot.set(containerMask.width / 2, containerMask.height / 2);
    containerMask.position.set(config.viewWidth / 2, config.viewHeight / 2);
    this.mainContainer?.addChild(containerMask);
    if (this.slotsContainer) this.slotsContainer.mask = containerMask;
  }
}

export default UserInterfaceManager;
