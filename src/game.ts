import Phaser from "phaser";
import { Main } from "./scenes/main";

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
  scene: [Main],
};

export default new Phaser.Game(config);
