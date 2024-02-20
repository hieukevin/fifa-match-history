import React from "react";
import { getGoals, getWins } from "@/libs/_action";
import DonutChart  from "./pieChart";
import Link from "next/link";
import Button from '@mui/material/Button';



async function OverallStats() {
  const { win, draws, losses } = await getWins();

  const { totalGoals1, totalGoals2 } = await getGoals();

  return (
    <div className="fixed sm:bottom-0 w-full flex flex-col items-center">
      <h1 className="sm:text-sm">All time record</h1>
      <p className="sm:text-sm">{win} - {draws} - {losses}</p>
      <div className="hidden sm:block">
        <DonutChart wins={win} losses={losses} goals1={totalGoals1} goals2={totalGoals2} />
      </div>
    </div>
  );
}

export default OverallStats;
