import "./style.css";
import * as PixiApp from "./components/pixi-app";
import { appConfig } from "./settings/Config";
import { Ticker } from "pixi.js";
import GameManager from "./game-manager";
import UserInterface from "./user-interface";

const config = appConfig;
const ticker = Ticker.shared;

const gameManager = new GameManager(config);

PixiApp.init(config);
// Setup UI
const ui = new UserInterface(config, ticker);
ui.createFPSLabel(config.fpsLabelSettings);
ui.createPlayButton(config.playButtonSettings, () => gameManager.startSpin());

gameManager.reels = ui.reels;
gameManager.playButton = ui.playButton;
console.log("Hello there...");
