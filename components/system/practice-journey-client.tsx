"use client";

import PracticeJourney from "./practice-journey";

export default function PracticeJourneyClient() {
  return (
    <PracticeJourney
      currentLevel={1}
      currentExp={0}
      completedTasks={[]}
      onTaskComplete={(taskId) => console.log("完成任务:", taskId)}
      onLevelUp={() => console.log("升级了！")}
    />
  );
}
