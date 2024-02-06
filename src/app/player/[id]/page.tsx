"use server";

import { Player } from "@/components/ranking";
import TransactionList, { TX } from "@/components/transaction-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Fetch player info
// https://it.api.namada.red/api/v1/player/search/tpknam1qqh9gu556m47vny2h58gfr0zardjl68j57dy4caw6mr9nkvgjes0uuwgz9m?player_kind=Pilot
async function getPlayer(pkey: string): Promise<Player> {
  const res = await fetch(
    `${process.env.NEBB_API_BASE_URL}/player/search/${pkey}?player_kind=Pilot`
  );

  if (!res.ok) {
    throw Error("failed to fetch player ranking");
  }

  let data = await res.json();
  return data.players[0];
}

// Get Transaction
async function getTransactions(pkey: string): Promise<[TX]> {
  const res = await fetch(
    `${process.env.INDEXER_API_BASE_URL}/tx_by_memo/${pkey}`
  );

  if (!res.ok) {
    throw Error("failed to fetch player txs");
  }

  return await res.json();
}

export default async function PlayerPage({
  params,
}: {
  params: { id: string };
}) {
  const player = await getPlayer(params.id);
  const txs = await getTransactions(params.id);
  const filtered_txs = txs.filter((tx) => tx.code_type !== "wrapper");

  return (
    <div className="container relative">
      <div className="flex items-center justify-between space-y-2 pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          {player.moniker}
        </h1>
        <p className="text-sm text-muted-foreground">{player.id}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{player.ranking_position}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROIDs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {player.score.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TXs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filtered_txs.length.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(player.uptime * 100).toFixed(2)} %
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="pt-8">
        <h2 className="text-2xl font-bold tracking-tight">Transaction List</h2>

        <TransactionList txs={filtered_txs} />
      </div>
    </div>
  );
}