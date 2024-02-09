import { ATLAS_KEYS, SCENE_KEYS } from "../constants/phaser";

import intervieweeWalkJson from "../assets/atlas/interviewee-walk.json";
import intervieweeWalkPng from "../assets/atlas/interviewee-walk.png";
import { GameState, setGameState } from "../states/game-state";
import { CustomScene } from "./custom-scene";

export class PreloadScene extends CustomScene {
  constructor() {
    super("Preload");
  }

  preload() {
    // TODO: loading bar
    // this.load.on('progress', (value) => {});

    this.load.on("complete", () => {
      this.scene.start(SCENE_KEYS.HOME);
      setGameState(GameState.HOME);
    });

    this.load.atlas(
      ATLAS_KEYS.INTERVIEWEE_WALK,
      intervieweeWalkPng,
      intervieweeWalkJson
    );
  }
}
