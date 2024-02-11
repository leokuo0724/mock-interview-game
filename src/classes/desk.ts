import { ATLAS_KEYS } from "../constants/phaser";
import { CustomSprite } from "./custom-sprite";

export class Desk extends CustomSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, ATLAS_KEYS.DESK);
    scene.add.existing(this);

    this.anims.create({
      key: "drop",
      frames: this._generateFramesFromAtlas("desk-drop_", 0, 25),
      repeat: 0,
      frameRate: 30,
    });
  }

  drop() {
    this.anims.play("drop");
  }
}
