import { DropdownStatsLeft } from "@/components/dropdownLeft";
import { DropdownStatsRight } from "@/components/dropdownRight";
import Header from "@/components/header";
import IndividualStatsLeft from "@/components/individualStatsLeft";
import IndividualStatsRight from "@/components/individualStatsRight";
import OverallStats from "@/components/overallStats";
import { getTeamStats } from "@/libs/_action";


export default async function Home() {
  const hieuTeamStats = await getTeamStats({ user: "Hieu" });
  const kubaTeamStats = await getTeamStats({ user: "Kuba" });
  return (
    <main>
      <Header />
      <div className="sm:flex justify-between hidden">
        <IndividualStatsLeft user="Hieu" />
        <IndividualStatsRight user="Kuba" />
      </div>
        
      <div className="sm:hidden flex justify-between">
        <DropdownStatsLeft teamsStats={JSON.parse(JSON.stringify(hieuTeamStats))} />
        <DropdownStatsRight teamsStats={JSON.parse(JSON.stringify(kubaTeamStats))} />
      </div>
        <OverallStats />
      
    </main>
  );
}
