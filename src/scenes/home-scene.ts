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
  private text!: Phaser.GameObjects.Text;
  private interviewee!: Interviewee;
  private ground!: Phaser.GameObjects.Image;

  constructor() {
    super(SCENE_KEYS.HOME);
  }

  create() {
    this.text = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        `MOCK\n INTERVIEW\n GAME`,
        TEXT_STYLE
      )
      .setOrigin(0.5);

    this.interviewee = new Interviewee(this);
    this.interviewee.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );

    this.ground = this.add.image(0, 0, TEXTURE_KEYS.GROUND);
    this.ground.setOrigin(0, 0);
    const intervieweeBottomLeft = this.interviewee.getBottomLeft();
    this.ground.setPosition(
      intervieweeBottomLeft.x! - 35,
      intervieweeBottomLeft.y
    );

    createEffect(() => {
      if (gameState() === GameState.START_TRANSITION) {
        this.startTransition();
      } else if (gameState() === GameState.GAME_TRANSITION) {
        this.gameTransition();
      }
    });
  }

  private gameTransition() {
    this.interviewee.openDoor();
    this.add.tween({
      targets: [this.interviewee, this.ground],
      alpha: 0,
      duration: 1200,
      delay: 500,
      onComplete: () => {},
    });
  }

  private startTransition() {
    this.tweens.add({
      targets: this.text,
      alpha: 0,
      duration: 700,
    });
    this.tweens.add({
      targets: this.ground,
      scaleX: 4,
      duration: 1000,
      delay: 200,
      ease: Phaser.Math.Easing.Quadratic.Out,
      onComplete: () => {
        this.tweens.add({
          targets: this.ground,
          x: `+=${this.cameras.main.width / 2 + 140}`,
          duration: 800,
          delay: 400,
          ease: Phaser.Math.Easing.Cubic.In,
          onComplete: () => {
            this.ground.setScale(1.2, 1);
            this.ground.x = -this.ground.width * 1.2;
            this.tweens.add({
              targets: this.ground,
              x: 0,
              duration: 700,
              ease: Phaser.Math.Easing.Sine.Out,
            });
          },
        });
      },
    });

    this.tweens.add({
      targets: this.interviewee,
      x: `+=${this.cameras.main.width / 2 + 70}`,
      duration: 1800,
      delay: 700,
      ease: Phaser.Math.Easing.Quadratic.In,
      onComplete: () => {
        this.interviewee.x = -this.interviewee.width / 2;
        this.tweens.add({
          targets: this.interviewee,
          x: this.interviewee.width,
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
}
