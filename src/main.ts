import "./style.css";
import * as PixiApp from "./components/PixiApp";
import { appConfig } from "./settings/Config";
import { Ticker } from "pixi.js";
import GameManager from "./managers/GameManager";
import UserInterfaceManager from "./managers/UserInterfaceManager";

const config = appConfig;
const ticker = Ticker.shared;

const gameManager = new GameManager(config);

PixiApp.init(config);
// should I move this setup inside UserInterfaceManager?
const uiManager = new UserInterfaceManager(ticker);
uiManager.createFPSLabel(config.fpsLabelSettings);
uiManager.createPlayButton(config.playButtonSettings, () =>
  gameManager.startSpin()
);
uiManager.loadTexture(config.slotTexturePath).then(() => {
  uiManager.createReels(config);
  uiManager.createReelMask(config);
});

gameManager.reels = uiManager.reels;
gameManager.playButton = uiManager.playButton;
console.log("Hello there...");
