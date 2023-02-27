import {
  BitmapFont,
  BitmapText,
  Container,
  FederatedPointerEvent,
  IPointData,
  Sprite,
  TextStyle,
  Texture,
} from "pixi.js";
import { AppConfigInterface } from "../config";
import { Colors } from "../settings/colors";
import GameManager from "../game-manager";

class PlayButton extends Container {
  protected background: Sprite;
  protected originalPosition: IPointData;

  callback: Function;

  constructor(settings: AppConfigInterface, gameManager: GameManager) {
    super();
    this.callback = () => {
      gameManager.startSpin();
    };

    this.originalPosition = settings.playButtonPosition;

    this.background = new Sprite(Texture.WHITE);
    this.background.width = 100;
    this.background.height = 50;
    this.addChild(this.background);

    const textStyle: Partial<TextStyle> = {
      fill: "#000000",
      fontSize: 16,
      fontWeight: "bold",
    };

    BitmapFont.from("PlayFont", textStyle);
    const content = new BitmapText("Play", { fontName: "PlayFont" });
    content.anchor.set(0.5, 0.5);
    content.position.set(this.width / 2, this.height / 2);

    this.addChild(content);

    this.pivot.set(this.width / 2, this.height / 2);
    this.position = this.originalPosition;

    this.setEnabled();
  }

  private handleClick(_: FederatedPointerEvent) {
    this.callback();
    this.setDisabled();
  }

  private handlePointerEnter(_: FederatedPointerEvent) {
    this.background.tint = Colors.btnHover;
  }

  private handlePointerExit(_: FederatedPointerEvent) {
    this.background.tint = Colors.btnActive;
  }

  public setEnabled() {
    this.interactive = true;
    this.addEventListener("pointerenter", this.handlePointerEnter);
    this.addEventListener("pointerout", this.handlePointerExit);
    this.addEventListener("pointerdown", this.handleClick);
    this.background.tint = Colors.btnActive;
  }

  public setDisabled() {
    this.interactive = false;
    this.background.tint = Colors.btnDisabled;
    this.removeEventListener("pointerdown", this.handleClick);
    this.removeEventListener("pointerenter", this.handlePointerEnter);
    this.removeEventListener("pointerout", this.handlePointerExit);
  }

  public resize(width: number, height: number): void {
    const newX = (width / 1280) * this.originalPosition.x;
    const newY = (height / 720) * this.originalPosition.y;
    this.position = { x: newX, y: newY };
  }
}

export default PlayButton;
