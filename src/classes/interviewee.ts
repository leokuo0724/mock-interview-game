import { ATLAS_KEYS } from "../constants/phaser";
import { CustomSprite } from "./custom-sprite";

export class Interviewee extends CustomSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, ATLAS_KEYS.INTERVIEWEE_WALK);
    scene.add.existing(this);

    this.anims.create({
      key: "walk",
      frames: this._generateFramesFromAtlas("interviewee-walk_", 0, 40),
      repeat: -1,
      frameRate: 30,
    });
    this.anims.play("walk");
  }
}
