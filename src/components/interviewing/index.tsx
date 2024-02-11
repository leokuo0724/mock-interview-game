import { For, createEffect } from "solid-js";
import { aiService } from "../../services/open-ai";
import { messages } from "../../states/messages";
import { Message } from "./message";

export const Interviewing = () => {
  createEffect(() => {
    aiService.chat();
  });

  return (
    <div class="flex w-full h-2/5 max-h-[40%]">
      <div class="w-full overflow-y-auto no-scrollbar flex flex-col-reverse gap-2 snap-y">
        <For each={messages.reverse()}>
          {(m) => <Message role={m.role} content={m.content} />}
        </For>
      </div>
    </div>
  );
};
