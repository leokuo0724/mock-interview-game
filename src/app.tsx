import { createEffect, type Component } from "solid-js";
import { Home } from "./components/home";
import { Interviewing } from "./components/interviewing";
import { PreSettings } from "./components/pre-settings";
import { Toaster } from "./components/ui/toaster";
import { GameState, gameState } from "./states/game-state";
import { resizeCounter } from "./states/screen";

export const App: Component = () => {
  let ref: HTMLDivElement | undefined = undefined;

  const resizeApp = () => {
    const style = document.querySelector("canvas")?.style;
    if (!ref || !style) return;

    ref.style.width = style.width;
    ref.style.height = style.height;
    ref.style.marginLeft = style.marginLeft;
    ref.style.marginTop = style.marginTop;
  };

  createEffect(() => {
    if (resizeCounter() > 0) resizeApp();
  });

  return (
    <div class="absolute overflow-auto" ref={ref}>
      {gameState() === GameState.HOME && <Home />}
      {(gameState() === GameState.PRE_SETTINGS ||
        gameState() === GameState.GAME_TRANSITION) && <PreSettings />}
      {gameState() === GameState.INTERVIEWING && <Interviewing />}
      <Toaster />
    </div>
  );
};
