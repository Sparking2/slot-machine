import "./style.css";
import * as PixiApp from "./components/pixi-app";
import { appConfig } from "./settings/Config";
import { Ticker } from "pixi.js";
import GameManager from "./game-manager";
import UserInterface from "./user-interface";

const config = appConfig;
const ticker = Ticker.shared;
ticker.maxFPS = config.maxFPS;

const gameManager = new GameManager(config);

PixiApp.init(config);
const ui = new UserInterface(config, ticker, () => gameManager.startSpin());
gameManager.reels = ui.reels;
gameManager.playButton = ui.playButton;
console.log("Hello there...");
