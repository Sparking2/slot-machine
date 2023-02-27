import "../style.css";

import { Application } from "pixi.js";
import { AppConfigInterface } from "../config";
import { Colors } from "../settings/colors";
export let pixiApp: Application;

export function init(settings: AppConfigInterface) {
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

function resize() {
  const w = window.innerWidth / 1280;
  const h = window.innerHeight / 720;
  pixiApp.stage.scale.set(w, h);
}
