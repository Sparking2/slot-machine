import { IPointData } from "pixi.js";
import { pixiApp } from "./pixi";
import { Transforms } from "./transforms";

export namespace Size {
  export const appWith = 0.9; // in % 0 - 1
  export const appHeight = 0.9; // in % 0 - 1
}
export namespace Colors {
  export const viewBackground = 0x777777;
  export const mainStageBackground = 0xffffff;
}

export namespace Layout {
  export function getStagePositions(): IPointData {
    return {
      x: Transforms.mainStage.position.x * pixiApp.view.width,
      y: Transforms.mainStage.position.y * pixiApp.view.height,
    };
  }

  export function getStageSize() {
    return {
      width: Transforms.mainStage.size.width * pixiApp.view.width,
      height: Transforms.mainStage.size.height * pixiApp.view.height,
    };
  }
}

export namespace AppSettings {
  export const resizeDelay = 200; // ms
}
