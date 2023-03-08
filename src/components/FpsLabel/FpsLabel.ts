import { BitmapFont, BitmapText, Container, TextStyle, Ticker } from "pixi.js";
import { IFpsConfig } from "./IFpsConfig";

class FpsLabel extends Container {
  protected fontName = "fpsFont";
  protected textStyle: Partial<TextStyle> = {
    fill: "#333333",
    fontSize: 16,
    fontWeight: "bold",
  };
  protected availableChars = {
    chars: [["a", "z"], ["0", "9"], ["A", "Z"], ".,:?><"],
  };
  protected content: BitmapText;

  constructor(config: IFpsConfig, ticker: Ticker) {
    super();

    this.textStyle.fontSize = config.fontSize;

    BitmapFont.from(this.fontName, this.textStyle, this.availableChars);
    this.content = new BitmapText("", { fontName: "fpsFont" });
    this.addChild(this.content);
    this.position = config.position;

    const tick = () => {
      const fps = ticker.FPS.toFixed(2);
      this.content.text = `FPS: ${fps}`;
    };

    ticker.add(tick);
  }
}

export default FpsLabel;
