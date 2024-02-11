import { ATLAS_KEYS } from "../constants/phaser";
import { CustomSprite } from "./custom-sprite";

export class IntervieweeSit extends CustomSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, ATLAS_KEYS.INTERVIEWEE_SIT);
    scene.add.existing(this);

    this.anims.create({
      key: "idle",
      frames: this._generateFramesFromAtlas("interviewee-sit-idle_", 0, 9),
      repeat: -1,
      frameRate: 15,
      yoyo: true,
      repeatDelay: 300,
    });
    this.anims.create({
      key: "talk",
      frames: this._generateFramesFromAtlas("interviewee-sit-talk_", 0, 11),
      repeat: -1,
      frameRate: 10,
      yoyo: true,
      repeatDelay: 300,
    });

    this.anims.play("idle");
  }
}
