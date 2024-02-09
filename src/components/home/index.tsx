import { Component } from "solid-js";
import { APIKeyDialog } from "./api-key-dialog";

export const Home: Component = () => {
  return (
    <>
      <div class="flex w-full h-full justify-center relative">
        <span class="absolute font-medium top-[36px] text-muted-foreground text-sm">
          Mock Interview Game | Leo Kuo
        </span>
        {/* @ts-ignore */}
        <APIKeyDialog class="absolute bottom-[48px]" />
      </div>
    </>
  );
};
