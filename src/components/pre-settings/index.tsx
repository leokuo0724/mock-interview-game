import { As } from "@kobalte/core";
import { JSX, Show, createSignal } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { GameState, setGameState } from "../../states/game-state";
import { setInterviewConfig } from "../../states/interview-config";
import { setMessages } from "../../states/messages";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const [isShowForm, setShowForm] = createSignal(true);

export const PreSettings = () => {
  return (
    <div class="flex h-full">
      {/* Empty space */}
      <div class="flex-1"></div>

      {/* Content */}
      <Presence exitBeforeEnter>
        <Show when={isShowForm()}>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            class="flex-[2] py-6 h-full flex flex-col md:justify-center items-start gap-6"
          >
            <PreSettingsForm />
          </Motion.div>
        </Show>
      </Presence>
    </div>
  );
};

const PreSettingsForm = () => {
  const [gender, setGender] = createSignal("Male");
  const [position, setPosition] = createSignal("Frontend Engineer");
  const [level, setLevel] = createSignal("Junior");

  const handleSubmit: JSX.EventHandlerUnion<
    HTMLFormElement,
    Event & {
      submitter: HTMLElement;
    }
  > = (event) => {
    event.preventDefault();
    const elements = (event.target as any).elements;
    const name = elements.namedItem("name").value;
    const extraInfo = elements.namedItem("extra-info").value;

    setInterviewConfig({
      name,
      gender: gender(),
      position: position(),
      level: level(),
      extraInfo,
    });
    setMessages([
      {
        role: "system",
        content: `Your are a tech lead from a company(${extraInfo}). And user is a ${level()} ${position()} candidate. Start with greeting and then ask a question to interview the user. (Without response with character role)`,
      },
    ]);
    setShowForm(false);
    setGameState(GameState.GAME_TRANSITION);
  };

  return (
    <>
      <div class="flex flex-col">
        <h2 class="text-3xl font-bold tracking-tight">Interview Settings </h2>
        <p class="text-muted-foreground">Setup your mock interview settings</p>
      </div>

      <form
        id="interview-settings-form"
        class="grid gap-x-4 gap-y-5 grid-cols-1 md:grid-cols-2"
        onsubmit={handleSubmit}
      >
        <div class="flex flex-col gap-2">
          <Label for="name">
            Your Name <span class="text-red-900">*</span>
          </Label>
          <Input name="name" placeholder="Your name" maxLength={20} required />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="gender">
            Your Gender <span class="text-red-900">*</span>
          </Label>
          <Select
            name="gender"
            value={gender()}
            onChange={setGender}
            options={["Male", "Female"]}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
            required
            disabled
          >
            {/* TODO: temp set disabled */}
            <Tooltip placement="bottom-start">
              <TooltipTrigger asChild>
                <As component={SelectTrigger}>
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </As>
              </TooltipTrigger>
              <TooltipContent>
                <p>Work in progress. Only has male character right now. </p>
              </TooltipContent>
            </Tooltip>
            <SelectContent />
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="position">
            Position <span class="text-red-900">*</span>
          </Label>
          <Select
            name="position"
            value={position()}
            onChange={setPosition}
            options={[
              "Frontend Engineer",
              "Backend Engineer",
              "Full Stack Engineer",
            ]}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
            required
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="level">
            Level <span class="text-red-900">*</span>
          </Label>
          <Select
            name="level"
            value={level()}
            onChange={setLevel}
            options={["Junior", "Mid", "Senior", "Staff", "Principal"]}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
            required
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div class="flex flex-col gap-2 col-span-1 md:col-span-2">
          <Label for="extra-info">What kind of company?</Label>
          <Input
            name="extra-info"
            placeholder="Describe more about the company"
            maxLength={100}
          />
        </div>
      </form>

      <Button type="submit" form="interview-settings-form">
        Submit
      </Button>
    </>
  );
};
