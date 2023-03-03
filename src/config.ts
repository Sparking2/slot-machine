import { IPointData } from "pixi.js";
import { Colors } from "./settings/colors";
import TileSlotType = Colors.TileSlotType;

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
  slotTileSize: number;
  gameTime: number;
  slotCount: number;
  slotPadding: number;
  slotSpeed: number;
  slotTexturePath: string;
  slotTiles: TileSlotType[][];
}

export const appConfig: AppConfigInterface = {
  slotCount: 5,
  slotPadding: 10,
  slotTileSize: 100,
  slotSpeed: 35,
  slotTexturePath: "spritesheets/task2.json",
  slotTiles: [
    [Colors.slot1, Colors.slot2, Colors.slot3, Colors.slot4],
    [Colors.slot4, Colors.slot1, Colors.slot2, Colors.slot3],
    [Colors.slot3, Colors.slot4, Colors.slot1, Colors.slot2],
    [Colors.slot2, Colors.slot3, Colors.slot4, Colors.slot1],
    [Colors.slot1, Colors.slot2, Colors.slot3, Colors.slot4],
  ],
  fpsLabelPosition: { x: 100, y: 2 },
  playButtonPosition: { x: 1000, y: 500 },
  viewWidth: 1280,
  viewHeight: 720,
  frameCheckInterval: 100,
  maxFPS: 60,
  gameTime: 3692, // ms
};
