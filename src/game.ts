import Phaser from "phaser";
import { HomeScene } from "./scenes/home-scene";
import { PreloadScene } from "./scenes/preload-scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "game",
  backgroundColor: "#ffffff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 576,
    },
  },
  scene: [PreloadScene, HomeScene],
};

export default new Phaser.Game(config);
