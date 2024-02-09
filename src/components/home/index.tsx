import { Component } from "solid-js";
import { APIKeyDialog } from "./api-key-dialog";

export const Home: Component = () => {
  return (
    <>
      <div class="flex w-full h-full justify-center relative">
        <h1 class="absolute font-bold text-2xl top-[36px]">MOCK INTERVIEW</h1>
        {/* @ts-ignore */}
        <APIKeyDialog class="absolute bottom-[48px]" />
      </div>
    </>
  );
};
