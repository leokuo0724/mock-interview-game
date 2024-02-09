import Phaser from "phaser";

export abstract class CustomSprite extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, atlasKey: string) {
    super(scene, 0, 0, atlasKey);
  }

  protected _generateFramesFromAtlas(
    prefix: string,
    start: number,
    end: number
  ) {
    return this.anims.generateFrameNames(this.texture.key, {
      prefix,
      suffix: ".png",
      start,
      end,
      zeroPad: 3,
    });
  }
}
