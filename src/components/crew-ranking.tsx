"use server";

import { Player, RankingTable } from "./ranking";

async function getCrew(): Promise<Player[]> {
  const res = await fetch(
    `https://it.api.namada.red/api/v1/scoreboard/crew?page=0`
  );

  if (!res.ok) {
    throw Error("failed to fetch crew ranking");
  }

  let data = await res.json();
  return data.players;
}

export async function CrewRanking() {
  const crew = await getCrew();
  return <RankingTable elements={crew} />;
}
