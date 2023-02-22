import { BitmapFont, BitmapText, Container, TextStyle, Ticker } from "pixi.js";
import { AppConfigInterface } from "./config";

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

  private millisecondsPast: number = 0;

  protected content: BitmapText;

  constructor(settings: AppConfigInterface, ticker: Ticker) {
    super();
    this.position.set(100, 0);

    BitmapFont.from(this.fontName, this.textStyle, this.availableChars);
    this.content = new BitmapText("", { fontName: "fpsFont" });
    this.addChild(this.content);

    ticker.add((_: number) => {
      this.millisecondsPast += ticker.elapsedMS;
      if (this.millisecondsPast < settings.frameCheckInterval) return;

      this.millisecondsPast = 0;
      const fps = ticker.FPS.toFixed(2);
      this.content.text = `FPS: ${fps}`;
    });
  }
}

export default FpsDisplay;
