import "../style.css";

import { Application } from "pixi.js";
import { IAppConfig } from "../settings/Config";
import * as Colors from "../constants/Colors";
export let pixiApp: Application;

export function init(settings: IAppConfig) {
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
    width: settings.viewWidth,
    height: settings.viewHeight,
    resizeTo: app,
  });

  window.addEventListener("resize", resize);

  resize();
}

export function resize() {
  const w = window.innerWidth / 1280;
  const h = window.innerHeight / 720;
  pixiApp.stage.scale.set(w, h);
}
