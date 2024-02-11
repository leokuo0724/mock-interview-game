import { ATLAS_KEYS, SCENE_KEYS } from "../constants/phaser";

import deskJson from "../assets/atlas/desk.json";
import deskPng from "../assets/atlas/desk.png";
import intervieweeOpenDoorJson from "../assets/atlas/interviewee-open-door.json";
import intervieweeOpenDoorPng from "../assets/atlas/interviewee-open-door.png";
import intervieweeSitJson from "../assets/atlas/interviewee-sit.json";
import intervieweeSitPng from "../assets/atlas/interviewee-sit.png";
import intervieweeWalkJson from "../assets/atlas/interviewee-walk.json";
import intervieweeWalkPng from "../assets/atlas/interviewee-walk.png";
import interviewerSitJson from "../assets/atlas/interviewer-sit.json";
import interviewerSitPng from "../assets/atlas/interviewer-sit.png";

import { GameState, setGameState } from "../states/game-state";
import { CustomScene } from "./custom-scene";
import { drawGroundLine } from "./utils";

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
    this.load.atlas(
      ATLAS_KEYS.INTERVIEWEE_OPEN_DOOR,
      intervieweeOpenDoorPng,
      intervieweeOpenDoorJson
    );
    this.load.atlas(
      ATLAS_KEYS.INTERVIEWEE_SIT,
      intervieweeSitPng,
      intervieweeSitJson
    );
    this.load.atlas(
      ATLAS_KEYS.INTERVIEWER_SIT,
      interviewerSitPng,
      interviewerSitJson
    );
    this.load.atlas(ATLAS_KEYS.DESK, deskPng, deskJson);

    const graphics = new Phaser.GameObjects.Graphics(this);
    drawGroundLine(graphics);
  }
}
