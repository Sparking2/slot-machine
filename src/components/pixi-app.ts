import "../style.css";

import { Application } from "pixi.js";
import { AppConfigInterface } from "../config";
import { Colors } from "../settings/colors";
export let pixiApp: Application;

export function init(settings: AppConfigInterface) {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("Can't find app div");

  const width =
    settings.viewWidth <= 1.0
      ? settings.viewWidth * app.clientWidth
      : settings.viewWidth;
  const height =
    settings.viewHeight <= 1.0
      ? settings.viewHeight * app.clientHeight
      : settings.viewHeight;

  const canvas = document.createElement("canvas");
  canvas.id = "pixi-canvas";
  app.appendChild(canvas);
  pixiApp = new Application({
    view: canvas,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: Colors.viewBackground,
    width: width,
    height: height,
    // resizeTo: window,
  });
}
