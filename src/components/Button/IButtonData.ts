import { IPointData } from "pixi.js";

export interface IButtonData {
  text: string;
  buttonWidth: number;
  buttonHeight: number;
  position: IPointData;
  callback?: Function;
  normalColor: number;
  hoverColor: number;
  disabledColor: number;
}
