import { For, Show, createEffect } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { aiService } from "../../services/open-ai";
import { isAILoading, messages } from "../../states/messages";
import { Message } from "./message";

export const Interviewing = () => {
  createEffect(() => {
    aiService.chat();
  });

  return (
    <div class="flex w-full h-2/5 max-h-[40%]">
      <Presence exitBeforeEnter>
        <Show when={isAILoading()}>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            class="flex w-full px-8 snap-end justify-end"
          >
            <div class="w-2/6 max-h-32">
              <div class="w-fit border border-slate-800 p-2 text-left">
                <p class="text-sm">...</p>
              </div>
            </div>
          </Motion.div>
        </Show>
      </Presence>
      <div class="w-full overflow-y-auto no-scrollbar flex flex-col-reverse gap-2 snap-y">
        <For each={messages.reverse()}>
          {(m) => <Message role={m.role} content={m.content} />}
        </For>
      </div>
    </div>
  );
};
