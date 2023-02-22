import "./style.css";
import * as PixiApp from "./pixi";
import * as UI from "./user-interface";
import { appConfig } from "./config";
import { Ticker } from "pixi.js";

const config = appConfig;
const ticker = Ticker.shared;
ticker.maxFPS = config.maxFPS;

PixiApp.init();
UI.init(config, ticker);

console.log("Hello there...");
