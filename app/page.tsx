import HeroVideo from "@/components/background";
import Header from "@/components/header";
import IndividualStatsLeft from "@/components/individualStatsLeft";
import IndividualStatsRight from "@/components/individualStatsRight";
import OverallStats from "@/components/overallStats";

import { hieuTeamStats } from "@/public/team_stats/hieu";
import { kubaTeamStats } from "@/public/team_stats/kuba";
export default function Home() {
  return (
    <main>
      <HeroVideo />
      <Header />
      <div className="flex justify-between">
        <IndividualStatsLeft teams={hieuTeamStats}/>
        <IndividualStatsRight teams={kubaTeamStats} />
      </div>
      <OverallStats />
      
    </main>
  );
}
