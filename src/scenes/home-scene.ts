import { createEffect } from "solid-js";
import { Interviewee } from "../classes/interviewee";
import { SCENE_KEYS, TEXTURE_KEYS } from "../constants/phaser";
import { GameState, gameState, setGameState } from "../states/game-state";
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

    createEffect(() => {
      if (gameState() === GameState.START_TRANSITION) {
        this.tweens.add({
          targets: text,
          alpha: 0,
          duration: 700,
        });
        this.tweens.add({
          targets: ground,
          scaleX: 4,
          duration: 1000,
          delay: 200,
          ease: Phaser.Math.Easing.Quadratic.Out,
          onComplete: () => {
            this.tweens.add({
              targets: ground,
              x: `+=${this.cameras.main.width / 2 + 140}`,
              duration: 800,
              delay: 400,
              ease: Phaser.Math.Easing.Cubic.In,
              onComplete: () => {
                ground.setScale(1.2, 1);
                ground.x = -ground.width * 1.2;
                this.tweens.add({
                  targets: ground,
                  x: 0,
                  duration: 700,
                  ease: Phaser.Math.Easing.Sine.Out,
                });
              },
            });
          },
        });

        this.tweens.add({
          targets: interviewee,
          x: `+=${this.cameras.main.width / 2 + 70}`,
          duration: 1800,
          delay: 700,
          ease: Phaser.Math.Easing.Quadratic.In,
          onComplete: () => {
            interviewee.x = -interviewee.width / 2;
            this.tweens.add({
              targets: interviewee,
              x: interviewee.width,
              duration: 1000,
              delay: 500,
              ease: Phaser.Math.Easing.Cubic.Out,
              onComplete: () => {
                setGameState(GameState.PRE_SETTINGS);
              },
            });
          },
        });
      }
    });
  }
}
