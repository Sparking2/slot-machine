import { IPointData } from "pixi.js";
import * as Colors from "../constants/Colors";
import { IButtonData } from "../components/Button/IButtonData";
import { TempTiles } from "./tempTiles";

export interface IAppConfig {
  // in ms
  frameCheckInterval: number;
  maxFPS: number;
  // 0 - 1.0 for screen %, 1 - inf for pixel size
  viewWidth: number;
  // 0 - 1.0 for screen %, 1 - inf for pixel size
  viewHeight: number;
  fpsLabelPosition: IPointData;
  slotTileSize: number;
  gameTime: number;
  slotCount: number;
  slotPadding: number;
  slotSpeed: number;
  slotTexturePath: string;
  slotTiles: TempTiles.TileSlotType[][];
  playButtonSettings: IButtonData;
}

export const appConfig: IAppConfig = {
  playButtonSettings: {
    text: "Play",
    buttonWidth: 100,
    buttonHeight: 50,
    position: { x: 1000, y: 500 },
    normalColor: Colors.btnActive,
    hoverColor: Colors.btnHover,
    disabledColor: Colors.btnDisabled,
  },
  slotCount: 5,
  slotPadding: 10,
  slotTileSize: 100,
  slotSpeed: 35,
  slotTexturePath: "spritesheets/task2.json",
  slotTiles: [
    [TempTiles.slot1, TempTiles.slot2, TempTiles.slot3, TempTiles.slot4],
    [TempTiles.slot4, TempTiles.slot1, TempTiles.slot2, TempTiles.slot3],
    [TempTiles.slot3, TempTiles.slot4, TempTiles.slot1, TempTiles.slot2],
    [TempTiles.slot2, TempTiles.slot3, TempTiles.slot4, TempTiles.slot1],
    [TempTiles.slot1, TempTiles.slot2, TempTiles.slot3, TempTiles.slot4],
  ],
  fpsLabelPosition: { x: 100, y: 2 },
  viewWidth: 1280,
  viewHeight: 720,
  frameCheckInterval: 100,
  maxFPS: 60,
  gameTime: 3500, // ms
};
