import { For, createEffect, createSignal } from "solid-js";
import { Motion } from "solid-motionone";
import { aiService } from "../../services/open-ai";
import { interviewState, messages } from "../../states/messages";
import { Button } from "../ui/button";
import { AnswerTextarea } from "./answer-textarea";
import { Message } from "./message";

export const Interviewing = () => {
  const [isUserTyping, setIsUserTyping] = createSignal(false);
  createEffect(() => {
    aiService.chat();
  });

  return (
    <div class="flex w-full h-2/5 max-h-[40%]">
      <div class="w-full overflow-y-auto no-scrollbar flex flex-col-reverse gap-2 snap-y">
        {interviewState() === "ai-responding" && (
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
        )}
        {interviewState() === "user-responding" && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            class="flex w-full px-8 snap-end justify-start pb-2"
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
        )}

        <For each={messages.toReversed()}>
          {(m) => <Message role={m.role} content={m.content} />}
        </For>
      </div>
    </div>
  );
};
