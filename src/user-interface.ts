import { pixiApp } from "./pixi";
import { Container, Graphics } from "pixi.js";
import { AppSettings, Colors, Layout } from "./config";

let isResizing = false;

let mainContainer: Container;

export function init() {
  redraw();
}

export function resize() {
  if (isResizing) return;
  isResizing = true;
  setTimeout(() => {
    redraw();
    isResizing = false;
  }, AppSettings.resizeDelay);
}

export function redraw() {
  const { width, height } = pixiApp.view;

  if (!mainContainer) mainContainer = new Container();
  else mainContainer.removeChildren();

  mainContainer.addChild(createMainStage());

  pixiApp.stage.addChild(mainContainer);
  console.log(width, height);
}

function createMainStage() {
  let container = new Container();
  let bg = new Graphics();
  bg.beginFill(Colors.mainStageBackground)
    .drawRect(0, 0, Layout.getStageSize().width, Layout.getStageSize().height)
    .endFill();
  container.addChild(bg);
  container.pivot.set(container.width / 2, container.height / 2);
  container.position = Layout.getStagePositions();
  return container;
}
