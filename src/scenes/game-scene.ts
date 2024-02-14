import { createEffect } from "solid-js";
import { Desk } from "../classes/desk";
import { IntervieweeSit } from "../classes/interviewee-sit";
import { InterviewerSit } from "../classes/interviewer-sit";
import { SCENE_KEYS } from "../constants/phaser";
import { GameState, setGameState } from "../states/game-state";
import { messages } from "../states/messages";
import { CustomScene } from "./custom-scene";

export class GameScene extends CustomScene {
  private intervieweeSit!: IntervieweeSit;
  private interviewerSit!: InterviewerSit;
  private ground!: Phaser.GameObjects.Image;
  private desk!: Desk;

  constructor() {
    super(SCENE_KEYS.GAME);
  }

  create() {
    this.cameras.main.setZoom(0.8);

    const characterY = this.cameras.main.height / 2 + 120;
    const intervieweeX = this.cameras.main.width / 2 - 120;
    this.intervieweeSit = new IntervieweeSit(this).setAlpha(0);
    this.intervieweeSit.setPosition(
      this.cameras.main.width / 2 - 240,
      characterY
    );

    const interviewerX = this.cameras.main.width / 2 + 120;
    this.interviewerSit = new InterviewerSit(this).setAlpha(0);
    this.interviewerSit.setPosition(
      this.cameras.main.width / 2 + 240,
      characterY
    );

    this.ground = this.add.image(0, 0, "ground").setOrigin(0.5, 0).setScale(0);
    const intervieweeBottom = this.intervieweeSit.getBottomCenter();
    this.ground.setPosition(this.cameras.main.width / 2, intervieweeBottom.y);

    this.desk = new Desk(this).setOrigin(0.5, 1).setAlpha(0);
    this.desk.setPosition(this.cameras.main.width / 2, intervieweeBottom.y);

    this.add.tween({
      targets: this.ground,
      scaleX: 2,
      scaleY: 1,
      ease: Phaser.Math.Easing.Bounce.Out,
      duration: 1000,
      onComplete: () => {
        this.cameras.main.zoomTo(1, 1000);
        this.desk.setAlpha(1);
        this.desk.drop();

        this.tweens.add({
          targets: this.interviewerSit,
          alpha: 1,
          x: interviewerX,
          delay: 300,
          duration: 1000,
          ease: Phaser.Math.Easing.Cubic.Out,
        });

        this.tweens.add({
          targets: this.intervieweeSit,
          alpha: 1,
          x: intervieweeX,
          delay: 300,
          duration: 1000,
          ease: Phaser.Math.Easing.Cubic.Out,
          completeDelay: 300,
          onComplete: async () => {
            setGameState(GameState.INTERVIEWING);
          },
        });
      },
    });

    createEffect(() => {
      if (messages.at(-1)?.role === "assistant") {
        this.interviewerSit.talk();
      }
      if (messages.at(-1)?.role === "user") {
        this.intervieweeSit.talk();
      }
    });
  }
}
