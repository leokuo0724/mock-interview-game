import { ATLAS_KEYS } from "../constants/phaser";
import { CustomSprite } from "./custom-sprite";

export class InterviewerSit extends CustomSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, ATLAS_KEYS.INTERVIEWER_SIT);
    scene.add.existing(this);

    this.anims.create({
      key: "idle",
      frames: this._generateFramesFromAtlas("interviewer-sit-idle_", 0, 10),
      repeat: -1,
      frameRate: 8,
      yoyo: true,
      repeatDelay: 300,
    });
    this.anims.create({
      key: "talk",
      frames: this._generateFramesFromAtlas("interviewer-sit-talk_", 0, 10),
      repeat: 1,
      frameRate: 10,
      yoyo: true,
      repeatDelay: 300,
    });

    this.anims.play("idle");
  }

  talk() {
    this.anims.play("talk").once("animationcomplete", () => {
      this.anims.play("idle");
    });
  }
}
