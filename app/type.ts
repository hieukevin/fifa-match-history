import { StaticImageData } from "next/image";

export type TeamStats = {
    team: string;
    logo: StaticImageData;
    games: number;
    wins: number;
    draws: number;
    losses: number;
  };

export interface TeamStatsDocument extends Document {
  team: string;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConcede: number;
  user: string;
}
