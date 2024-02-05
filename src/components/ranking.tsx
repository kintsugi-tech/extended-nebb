import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export type Player = {
  id: string;
  moniker: string;
  player_address: string;
  score: number;
  ranking_position: number;
  avatar_url: string;
  uptime: number;
  stake: number;
  is_banned: boolean;
};

interface RankingTableProps {
  elements: Player[];
}

export function RankingTable({ elements }: RankingTableProps) {
  return (
    <Table>
      <TableHeader className="text-primary">
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Moniker</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>ROIDs</TableHead>
          <TableHead>Txs</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {elements.map((e: Player) => (
          <TableRow key={e.id}>
            <TableCell className="font-medium">
              {e.ranking_position.toString()}
            </TableCell>
            <TableCell>{e.moniker}</TableCell>
            <TableCell>{e.player_address}</TableCell>
            <TableCell className="text-right">
              {e.score.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="link" size="icon" asChild>
                <Link href={`/player/${e.id}`}>
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
