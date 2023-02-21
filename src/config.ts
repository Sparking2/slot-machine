import { IPointData } from "pixi.js";
import { pixiApp } from "./pixi";

const stagePosition = {
  x: 0.5,
  y: 0.5,
};
const stageSize = {
  width: 0.5,
  height: 0.5,
};

export namespace PixiSettings {}
export namespace Size {
  export const appWith = 0.9; // in % 0 - 1
  export const appHeight = 0.9; // in % 0 - 1
}
export namespace Colors {
  export const viewBackground = 0x777777;
  export const mainStageBackground = 0xff00ff;
}

export namespace Layout {
  export function getStagePositions(): IPointData {
    return {
      x: stagePosition.x * pixiApp.view.width,
      y: stagePosition.y * pixiApp.view.height,
    };
  }

  export function getStageSize() {
    return {
      width: stageSize.width * pixiApp.view.width,
      height: stageSize.height * pixiApp.view.height,
    };
  }
}

export namespace AppSettings {
  export const resizeDelay = 200; // ms
}
