import {
  BitmapFont,
  BitmapText,
  Container,
  FederatedPointerEvent,
  Sprite,
  TextStyle,
  Texture,
} from "pixi.js";
import { IButtonData } from "./IButtonData";

class Button extends Container implements IButtonData {
  readonly text: string;
  readonly buttonWidth: number;
  readonly buttonHeight: number;
  readonly normalColor: number;
  readonly hoverColor: number;
  readonly disabledColor: number;
  readonly callback?: Function;
  readonly background: Sprite;

  constructor(data: IButtonData) {
    super();

    this.text = data.text;
    this.buttonWidth = data.buttonWidth;
    this.buttonHeight = data.buttonHeight;
    this.normalColor = data.normalColor;
    this.disabledColor = data.disabledColor;
    this.hoverColor = data.hoverColor;
    if (data.callback) this.callback = data.callback;

    Object.assign(this, data);

    const background = new Sprite(Texture.WHITE);
    background.width = data.buttonWidth;
    background.height = data.buttonHeight;
    this.background = background;
    this.addChild(background);

    const textStyle: Partial<TextStyle> = {
      fill: "#000000",
      fontSize: 16,
      fontWeight: "bold",
    };

    BitmapFont.from("btnFont", textStyle);
    const content = new BitmapText(this.text, { fontName: "btnFont" });
    content.anchor.set(0.5, 0.5);
    content.position.set(this.width / 2, this.height / 2);
    this.addChild(content);

    this.pivot.set(this.width / 2, this.height / 2);
    this.position = data.position;

    this.setEnabled();
  }

  private handleClick(_: FederatedPointerEvent) {
    if (this.callback) this.callback();
    this.setDisabled();
  }

  private handlePointerEnter(_: FederatedPointerEvent) {
    this.background.tint = this.hoverColor;
  }

  private handlePointerExit(_: FederatedPointerEvent) {
    this.background.tint = this.normalColor;
  }

  public setEnabled() {
    this.interactive = true;
    this.addEventListener("pointerenter", this.handlePointerEnter);
    this.addEventListener("pointerout", this.handlePointerExit);
    this.addEventListener("pointerdown", this.handleClick);
    this.background.tint = this.normalColor;
  }

  public setDisabled() {
    this.interactive = false;
    this.background.tint = this.disabledColor;
    this.removeEventListener("pointerdown", this.handleClick);
    this.removeEventListener("pointerenter", this.handlePointerEnter);
    this.removeEventListener("pointerout", this.handlePointerExit);
  }
}

export default Button;
