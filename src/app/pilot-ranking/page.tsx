import { PilotRanking } from "@/components/pilot-ranking";
import { siteConfig } from "@/config/site";

export default function PilotRankingPage() {
  return (
    <div className="container relative">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:pb-18">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-primary">
          Pilot Ranking
        </h1>
        <div className="px-8 pt-6 pb-8 mb-4">
          <PilotRanking />
        </div>
      </div>
    </div>
  );
}
