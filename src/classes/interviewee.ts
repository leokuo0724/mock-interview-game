import { ATLAS_KEYS } from "../constants/phaser";
import { CustomSprite } from "./custom-sprite";

export class Interviewee extends CustomSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, ATLAS_KEYS.INTERVIEWEE_WALK);
    scene.add.existing(this);

    this.walk();
  }

  walk() {
    this.anims.create({
      key: "walk",
      frames: this._generateFramesFromAtlas("interviewee-walk_", 0, 40),
      repeat: -1,
      frameRate: 30,
    });
    this.anims.play("walk");
  }
  openDoor() {
    this.anims.stop();
    this.setTexture(ATLAS_KEYS.INTERVIEWEE_OPEN_DOOR);
    this.anims.create({
      key: "open-door",
      frames: this._generateFramesFromAtlas("interviewee-open-door_", 0, 28),
      repeat: 0,
      frameRate: 30,
    });
    this.anims.play("open-door");
  }
}
