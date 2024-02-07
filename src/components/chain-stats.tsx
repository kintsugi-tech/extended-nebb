"use server";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export type TxStat = {
  return_code: number;
  tx_count: number;
};

export type ChainStats = {
  chain_id: string;
  time: string;
  height: number;
  tx_stats: TxStat[];
};

// Get Transaction
async function getStats(): Promise<ChainStats> {
  const res = await fetch(
    `${process.env.INDEXER_API_BASE_URL}/stats`,
    { next: { revalidate: 120 } } // Cache only 2 minutes
  );

  if (!res.ok) {
    throw Error("failed to fetch stats");
  }

  return await res.json();
}

export default async function ChainStats() {
  let stats = await getStats();

  // count valid txs
  let valid_tx_count = stats.tx_stats.reduce((acc, tx_stat: TxStat) => {
    if (tx_stat.return_code == 0 || tx_stat.return_code == 999) {
      return acc + tx_stat.tx_count;
    }
    return acc;
  }, 0);

  // Count invalid txs
  let invalid_tx_count = stats.tx_stats.reduce((acc, tx_stat: TxStat) => {
    if (tx_stat.return_code == 2 || tx_stat.return_code == 1) {
      return acc + tx_stat.tx_count;
    }
    return acc;
  }, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 pt-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Current height
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">#{stats.height}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Current Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {new Date(stats.time).toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Chain ID
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-md font-bold">{stats.chain_id}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Valid TXs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {valid_tx_count.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Failed TXs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {invalid_tx_count.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
