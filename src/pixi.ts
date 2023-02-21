import "./style.css";

import { Application } from "pixi.js";
import { Colors } from "./config";
import * as UI from "./user-interface";
export let pixiApp: Application;

export function init() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("Can't find app div");

  const canvas = document.createElement("canvas");
  canvas.id = "pixi-canvas";
  app.appendChild(canvas);
  pixiApp = new Application({
    view: canvas,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: Colors.viewBackground,
    resizeTo: app,
  });

  window.onresize = UI.resize;
}
