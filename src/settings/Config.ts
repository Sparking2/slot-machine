import * as Colors from "../constants/Colors";
import { IButtonData } from "../components/Button/IButtonData";
import { IFpsConfig } from "../components/FpsLabel/IFpsConfig";
import { ESymbolSlotType } from "../constants/ESymbolSlotType";

export interface IAppConfig {
  // 0 - 1.0 for screen %, 1 - inf for pixel size
  viewWidth: number;
  // 0 - 1.0 for screen %, 1 - inf for pixel size
  viewHeight: number;
  slotSymbolSize: number;
  gameTime: number;
  slotCount: number;
  slotPadding: number;
  slotSpeed: number;
  slotTexturePath: string;
  playButtonSettings: IButtonData;
  fpsLabelSettings: IFpsConfig;
  slotSymbolTextures: Map<ESymbolSlotType, string>;
  reelLength: number;
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
  fpsLabelSettings: {
    position: { x: 10, y: 5 },
    fontSize: 15,
  },
  slotTexturePath: "spritesheets/task2.json",
  slotSymbolTextures: new Map<ESymbolSlotType, string>([
    [ESymbolSlotType.A, "apple.png"],
    [ESymbolSlotType.B, "cherry.png"],
    [ESymbolSlotType.C, "seven.png"],
    [ESymbolSlotType.D, "watermelon.png"],
  ]),
  reelLength: 3, // n + 2
  slotCount: 5,
  slotPadding: 10,
  slotSymbolSize: 100,
  slotSpeed: 30,
  viewWidth: 1280,
  viewHeight: 720,
  gameTime: 3500, // ms
};
