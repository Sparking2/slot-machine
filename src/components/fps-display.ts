import {
  BitmapFont,
  BitmapText,
  Container,
  IPointData,
  TextStyle,
  Ticker,
} from "pixi.js";
import { IAppConfig } from "../config";

class FpsDisplay extends Container {
  protected fontName = "fpsFont";
  protected textStyle: Partial<TextStyle> = {
    fill: "#333333",
    fontSize: 16,
    fontWeight: "bold",
  };
  protected availableChars = {
    chars: [["a", "z"], ["0", "9"], ["A", "Z"], ".,:?><"],
  };
  protected originalPosition: IPointData;
  private millisecondsPast: number = 0;
  protected content: BitmapText;

  constructor(settings: IAppConfig, ticker: Ticker) {
    super();
    this.originalPosition = settings.fpsLabelPosition;

    BitmapFont.from(this.fontName, this.textStyle, this.availableChars);
    this.content = new BitmapText("", { fontName: "fpsFont" });
    this.addChild(this.content);

    this.pivot.set(this.width / 2, this.height / 2);
    this.position = this.originalPosition;

    const tick = () => {
      this.millisecondsPast += ticker.elapsedMS;
      if (this.millisecondsPast < settings.frameCheckInterval) return;
      this.millisecondsPast = 0;
      const fps = ticker.FPS.toFixed(2);
      this.content.text = `FPS: ${fps}`;
    };

    ticker.add(tick);
  }

  public resize(width: number, height: number): void {
    const newX = (width / 1280) * this.originalPosition.x;
    const newY = (height / 720) * this.originalPosition.y;
    this.position = { x: newX, y: newY };
  }
}

export default FpsDisplay;
