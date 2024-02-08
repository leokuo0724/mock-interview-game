import { Scene } from "phaser";
import { setResizeCounter } from "../states/screen";

const TEXT_STYLE = {
  fontFamily: "Arial Black",
  fontSize: 48,
  color: "#000000",
  align: "center",
};

export class Main extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    const text = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        `Hello World`,
        TEXT_STYLE
      )
      .setOrigin(0.5);

    this.scale.on("resize", this.resize, this);
  }

  resize() {
    // Modify value to resize DOM elements
    setResizeCounter((prev) => prev + 1);
  }
}
