import { TEXTURE_KEYS } from "../constants/phaser";

// Textures
export const drawGroundLine = (graphics: Phaser.GameObjects.Graphics) => {
  graphics.clear();
  graphics.fillStyle(0x000000, 1).fillRect(0, 0, 210, 3);
  graphics.generateTexture(TEXTURE_KEYS.GROUND, 210, 3);
};
