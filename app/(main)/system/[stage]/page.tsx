import { notFound } from "next/navigation";
import { stageDataMap, type StageKey } from "@/lib/system-data";
import StageDetailClient from "./stage-detail-client";

interface StagePageProps {
  params: Promise<{
    stage: string;
  }>;
}

export default async function StagePage({ params }: StagePageProps) {
  const { stage } = await params;
  const stageData = stageDataMap[stage as StageKey];

  if (!stageData) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <StageDetailClient stage={stageData} stageKey={stage as StageKey} />
    </div>
  );
}
