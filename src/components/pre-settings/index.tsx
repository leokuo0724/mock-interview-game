import { As } from "@kobalte/core";
import { JSX, Show, batch, createMemo, createSignal } from "solid-js";
import { produce } from "solid-js/store";
import { Motion, Presence } from "solid-motionone";
import { isShowPreSettingsForm, setShowPreSettingsForm } from "~/states/ui";
import { generateAIStartingSystemMessage } from "../../services/open-ai";
import { GameState, setGameState } from "../../states/game-state";
import {
  currentInterviewRound,
  setInterviewConfig,
  setInterviewReports,
} from "../../states/interview-config";
import { setMessages } from "../../states/messages";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { showToast } from "../ui/toaster";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const PreSettings = () => {
  return (
    <div class="flex h-full">
      {/* Empty space */}
      <div class="flex-1"></div>

      {/* Content */}
      <Presence exitBeforeEnter>
        <Show when={isShowPreSettingsForm()}>
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
  const [position, setPosition] = createSignal("");
  const [level, setLevel] = createSignal("");

  const [isHRChecked, setHRChecked] = createSignal(false);
  const [isCTOChecked, setCTOChecked] = createSignal(false);
  const [isCEOChecked, setCEOChecked] = createSignal(false);

  const checkedSections = createMemo(() => {
    return [
      isHRChecked() ? "HR" : "",
      isCTOChecked() ? "CTO" : "",
      isCEOChecked() ? "CEO" : "",
    ].filter(Boolean);
  });

  const checkedSectionsText = createMemo(() => checkedSections().join(", "));

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
    if (!name || !position() || !level() || checkedSections().length === 0) {
      showToast({
        title: "Uh oh! Something's missing.",
        description: "Please fill in all the required fields.",
      });
      return;
    }
    batch(() => {
      setInterviewConfig({
        name,
        gender: gender(),
        position: position(),
        level: level(),
        rounds: checkedSections(),
        extraInfo,
      });
      setInterviewReports(
        checkedSections().map((position) => ({
          interviewerPosition: position,
          isPassed: null,
          rating: null,
          summary: "",
          suggestion: "",
        }))
      );

      setMessages(
        produce((prev) =>
          prev.push(
            generateAIStartingSystemMessage({
              companyDetails: extraInfo,
              jobLevel: level(),
              jobPosition: position(),
              interviewerPosition: checkedSections()[currentInterviewRound()],
            })
          )
        )
      );
      setShowPreSettingsForm(false);
      setGameState(GameState.GAME_TRANSITION);
    });
  };

  return (
    <>
      <div class="flex flex-col">
        <h2 class="text-3xl font-bold tracking-tight">Interview Settings</h2>
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
          <Input name="name" placeholder="Your name" maxLength={20} />
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
            placeholder="Select a position"
            options={[
              "Frontend Engineer",
              "Backend Engineer",
              "Full Stack Engineer",
            ]}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
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
            placeholder="Select a level"
            options={["Junior", "Mid", "Senior", "Staff", "Principal"]}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
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
          <Label for="interview-type">
            Who you should interview with? <span class="text-red-900">*</span>
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div class="ring-offset-background text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {checkedSectionsText() ||
                  "Select which sections should included"}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[180px] md:w-[376px]">
              <DropdownMenuCheckboxItem
                checked={isHRChecked()}
                onChange={setHRChecked}
              >
                HR
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={isCTOChecked()}
                onChange={setCTOChecked}
              >
                CTO
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={isCEOChecked()}
                onChange={setCEOChecked}
              >
                CEO
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
