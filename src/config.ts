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
  gameTime: number;
  slotPositions: IPointData[];
}

export const appConfig: AppConfigInterface = {
  slotPositions: [
    { x: 310, y: 360 },
    { x: 420, y: 360 },
    { x: 530, y: 360 },
    { x: 640, y: 360 },
    { x: 750, y: 360 },
  ],
  fpsLabelPosition: { x: 100, y: 2 },
  playButtonPosition: { x: 1000, y: 500 },
  viewWidth: 1280,
  viewHeight: 720,
  frameCheckInterval: 100,
  maxFPS: 60,
  symbolSize: 100,
  gameTime: 3500, // ms
};
