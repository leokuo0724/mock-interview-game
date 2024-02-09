import { createEffect, onMount, type Component } from "solid-js";
import { Home } from "./components/home";
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
  onMount(() => {
    resizeApp();
  });

  createEffect(() => {
    if (resizeCounter() > 0) resizeApp();
  });

  const state = gameState();
  return (
    <div class="absolute" ref={ref}>
      {state === GameState.HOME && <Home />}
    </div>
  );
};
