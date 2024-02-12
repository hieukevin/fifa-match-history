import { StaticImageData } from "next/image";

export type TeamStats = {
    team: string;
    logo: StaticImageData;
    games: number;
    wins: number;
    draws: number;
    losses: number;
  };