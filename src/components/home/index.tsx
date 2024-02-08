import { Component } from "solid-js";
import { Button } from "../ui/button";

export const Home: Component = () => {
  return (
    <div class="flex w-full h-full justify-center relative">
      <h1 class="absolute font-bold text-2xl top-[36px]">MOCK INTERVIEW</h1>
      <Button class="absolute bottom-[48px]" variant="outline" size="sm">
        start
      </Button>
    </div>
  );
};
