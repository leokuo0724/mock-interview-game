import { Interviewee } from "../classes/interviewee";
import { SCENE_KEYS, TEXTURE_KEYS } from "../constants/phaser";
import { CustomScene } from "./custom-scene";

const TEXT_STYLE = {
  fontFamily: "Arial Black",
  fontSize: 48,
  color: "#000000",
  align: "center",
};

export class HomeScene extends CustomScene {
  constructor() {
    super(SCENE_KEYS.HOME);
  }

  create() {
    const text = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        `MOCK\n INTERVIEW\n GAME`,
        TEXT_STYLE
      )
      .setOrigin(0.5);

    const interviewee = new Interviewee(this);
    interviewee.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );

    const ground = this.add.image(0, 0, TEXTURE_KEYS.GROUND);
    ground.setOrigin(0, 0);
    const intervieweeBottomLeft = interviewee.getBottomLeft();
    ground.setPosition(intervieweeBottomLeft.x! - 35, intervieweeBottomLeft.y);
  }
}
