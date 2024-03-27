import { Component, batch } from "solid-js";
import { SCENE_KEYS } from "~/constants/phaser";
import PhaserGame from "~/game";
import { generateAIStartingSystemMessage } from "~/services/open-ai";
import { GameState, setGameState } from "~/states/game-state";
import {
  InterviewRating,
  InterviewReport,
  currentInterviewRound,
  interviewConfig,
  interviewReports,
  setCurrentInterviewRound,
  setInterviewConfig,
  setInterviewReports,
} from "~/states/interview-config";
import {
  interviewState,
  setInterviewState,
  setMessages,
} from "~/states/messages";
import {
  isShowReport,
  setShowPreSettingsForm,
  setShowReport,
} from "~/states/ui";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Timeline } from "../ui/timeline";

export const ReportDialog: Component = (props) => {
  const overallRating = () => calculateOverallRating(interviewReports);

  const handleContinue = () => {
    batch(() => {
      setInterviewState("idle");
      setGameState(GameState.POST_INTERVIEW);
      setCurrentInterviewRound((prev) => prev + 1);
      const { extraInfo, level, position, rounds } = interviewConfig;
      if (!level || !position || !rounds[currentInterviewRound()])
        throw new Error("Interview config is not complete");

      setMessages([
        generateAIStartingSystemMessage({
          companyDetails: extraInfo ?? "",
          jobLevel: level,
          jobPosition: position,
          interviewerPosition: interviewConfig.rounds[currentInterviewRound()],
        }),
      ]);
    });
    PhaserGame.scene.start(SCENE_KEYS.GAME);
  };

  const handleFinish = () => {
    // reset states
    batch(() => {
      setInterviewState("idle");
      setGameState(GameState.HOME);
      setCurrentInterviewRound(0);
      setMessages([]);
      setInterviewConfig({
        name: null,
        gender: null,
        position: null,
        level: null,
        rounds: [],
      });
      setInterviewReports([]);
      setShowPreSettingsForm(true);
      setShowReport(true);
    });
  };

  return (
    <Dialog
      open={interviewState() === "summarized" && isShowReport()}
      onOpenChange={setShowReport}
    >
      <DialogContent class="px-0">
        <DialogHeader class="px-6 ">
          <DialogTitle>Interview Result</DialogTitle>
          <DialogDescription>
            The overall result of the entire interview process.
          </DialogDescription>
        </DialogHeader>
        <div class="px-6">
          <Card>
            <div class="flex">
              <CardHeader>
                <CardTitle>Interviewee: {interviewConfig.name}</CardTitle>
                <CardDescription class="pb-2">
                  <p class="sm:hidden font-bold">
                    Overall Rating: {overallRating()}
                  </p>
                  You have been completed {currentInterviewRound() + 1}/
                  {interviewConfig.rounds.length} rounds of the interview.
                </CardDescription>
                <div class="flex gap-2">
                  <Badge variant="secondary" class="rounded-md">
                    {interviewConfig.level}
                  </Badge>
                  <Badge variant="secondary" class="rounded-md">
                    {interviewConfig.position}
                  </Badge>
                </div>
              </CardHeader>
              <div class="hidden sm:flex py-4 w-[1px]">
                <div class="w-full h-full bg-slate-200"></div>
              </div>
              <div class="hidden basis-32 sm:flex items-center justify-center">
                <div class="h-fit text-5xl text-muted-foreground">
                  {overallRating()}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div class="px-6 mb-4 max-h-[40vh] overflow-auto">
          <Timeline
            items={interviewReports.map((report, index) => ({
              title: `Round ${index + 1}: ${report.interviewerPosition}`,
              children: <ReportDetails report={report} />,
            }))}
            activeItem={currentInterviewRound()}
          />
        </div>

        <div class="px-6">
          <DialogFooter>
            {interviewConfig.rounds.length - 1 === currentInterviewRound() ? (
              <Button onClick={handleFinish}>Finish</Button>
            ) : (
              <Button onClick={handleContinue}>Continue</Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ReportDetails = ({ report }: { report: InterviewReport }) => {
  if (report.isPassed === null || report.rating === null) return null;

  return (
    <div class="mt-2 flex flex-col gap-2">
      <h3 class="text-foreground font-medium">
        Rating: {report.rating}; {report.isPassed ? "Passed" : "No Passed"}
      </h3>
      <p>{report.summary}</p>
      <p>
        <strong>Suggestion:</strong> {report.suggestion}
      </p>
    </div>
  );
};

// Helper
const calculateOverallRating = (
  reports: InterviewReport[]
): InterviewRating => {
  const ratings = reports
    .map((report) => report.rating)
    .filter((rating): rating is InterviewRating => !!rating);
  const sum = ratings.reduce((acc, cur) => acc + ratingToNumber(cur), 0);
  const average = sum / ratings.length;

  return numberToRating(average);
};
const ratingToNumber = (rating: InterviewRating): number => {
  switch (rating) {
    case "A+":
      return 12;
    case "A":
      return 11;
    case "A-":
      return 10;
    case "B+":
      return 9;
    case "B":
      return 8;
    case "B-":
      return 7;
    case "C+":
      return 6;
    case "C":
      return 5;
    case "C-":
      return 4;
    case "D+":
      return 3;
    case "D":
      return 2;
    case "D-":
      return 1;
  }
};
const numberToRating = (number: number): InterviewRating => {
  if (number >= 11) return "A";
  if (number >= 10) return "A-";
  if (number >= 9) return "B+";
  if (number >= 8) return "B";
  if (number >= 7) return "B-";
  if (number >= 6) return "C+";
  if (number >= 5) return "C";
  if (number >= 4) return "C-";
  if (number >= 3) return "D+";
  if (number >= 2) return "D";
  return "D-";
};
