"use server";

import { Player, RankingTable } from "./ranking";

async function getPilots(): Promise<Player[]> {
  const res = await fetch(
    `https://it.api.namada.red/api/v1/scoreboard/pilots?page=0`
  );

  if (!res.ok) {
    throw Error("failed to fetch pilots ranking");
  }

  let data = await res.json();
  return data.players;
}

export async function PilotRanking() {
  const pilots = await getPilots();
  return <RankingTable elements={pilots} />;
}
