import { For, Show, createSignal } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { messages } from "../../states/messages";
import { Button } from "../ui/button";
import { AnswerTextarea } from "./answer-textarea";
import { Message } from "./message";

export const Interviewing = () => {
  const [isUserTyping, setIsUserTyping] = createSignal(false);

  // createEffect(() => {
  //   aiService.chat();
  // });

  return (
    <div class="flex w-full h-2/5 max-h-[40%]">
      <div class="w-full overflow-y-auto no-scrollbar flex flex-col-reverse gap-2 snap-y">
        <Presence exitBeforeEnter>
          <Show when={true}>
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

        <For each={messages.reverse()}>
          {(m) => <Message role={m.role} content={m.content} />}
        </For>

        <Presence exitBeforeEnter>
          <Show when={true}>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              class="flex w-full px-8 snap-end justify-start"
            >
              <div class="flex justify-end w-2/6 max-h-32">
                {isUserTyping() ? (
                  <AnswerTextarea handleCancel={() => setIsUserTyping(false)} />
                ) : (
                  <Button size="sm" onclick={() => setIsUserTyping(true)}>
                    Answer
                  </Button>
                )}
              </div>
            </Motion.div>
          </Show>
        </Presence>
      </div>
    </div>
  );
};
