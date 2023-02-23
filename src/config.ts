import { IPointData } from "pixi.js";

export interface AppConfigInterface {
  // in ms
  frameCheckInterval: number;
  maxFPS: number;
  // 0 - 1.0 for screen %, 1 - inf for pixel size
  viewWidth: number;
  // 0 - 1.0 for screen %, 1 - inf for pixel size
  viewHeight: number;
  fpsLabelPosition: IPointData;
  playButtonPosition: IPointData;
  symbolSize: number;
}

export const appConfig: AppConfigInterface = {
  fpsLabelPosition: { x: 100, y: 2 },
  playButtonPosition: { x: 1000, y: 500 },
  viewWidth: 1280,
  viewHeight: 720,
  frameCheckInterval: 100,
  maxFPS: 60,
  symbolSize: 100,
};
