"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";

export type TX = {
  tx_hash: string;
  header_height: number;
  header_time: string;
  return_code: number;
  block_hash: string;
  block_id: string;
  tx_type: string;
  wrapper_hash: string;
  fee_amount_per_gas_unit: number;
  fee_token: string;
  gas_limit_multiplier: number;
  code_type: string;
  code: string;
  data: string;
  memo: string;
  tx: any;
  block: object;
};

interface TransactionListTableProps {
  txs: TX[];
}

export function renderInternalTx(tx: TX) {
  let tx_details = null;

  // todo better types
  if (tx.tx !== null) {
    switch (tx.code_type) {
      case "tx_transfer":
        tx_details = (
          <p className="mt-3">
            <b>From:</b> {tx.tx.Transfer.source} <br />
            <b>To:</b> {tx.tx.Transfer.target} <br />
            <b>Token:</b> {tx.tx.Transfer.token} <br />
            <b>Amount:</b> {tx.tx.Transfer.amount.toLocaleString()} <br />
          </p>
        );
        break;
      case "tx_unbond":
        tx_details = (
          <p className="mt-3">
            <b>Validator:</b> {tx.tx.Unbond.validator} <br />
            <b>Amount:</b> {tx.tx.Unbond.amount.toLocaleString()} <br />
          </p>
        );
        break;
      case "tx_reveal_pk":
        tx_details = (
          <p className="mt-3">
            <b>PKey:</b> {tx.tx.RevealPK} <br />
          </p>
        );
        break;
      case "tx_bond":
        tx_details = (
          <p className="mt-3">
            <b>Validator:</b> {tx.tx.Bond.validator} <br />
            <b>Amount:</b> {tx.tx.Bond.amount.toLocaleString()} <br />
            <b>Amount:</b> {tx.tx.Bond.source} <br />
          </p>
        );
        break;
      case "tx_ibc":
        tx_details = (
          <p className="mt-3">
            <b>Message:</b> {Object.keys(tx.tx.Ibc)[0]} <br />
          </p>
        );
        break;
      case "tx_vote_proposal":
        tx_details = (
          <p className="mt-3">
            <b>ID:</b> {tx.tx.VoteProposal.id} <br />
            <b>Option:</b> {tx.tx.VoteProposal.vote} <br />
            <b>Voter:</b> {tx.tx.VoteProposal.voter} <br />
          </p>
        );
        break;
      default:
        tx_details = (
          <p className="mt-3 font-mono w-full">{JSON.stringify(tx.tx)}</p>
        );
    }
  }

  if (tx.tx === null) {
    tx_details = (
      <p className="mt-3 font-mono w-full">Failed to read tx details</p>
    );
  }

  return (
    <>
      <p>
        <b>TX Hash:</b> {formatTxHash(tx.tx_hash)} <br />
        <b>Wrapper Hash:</b> {formatTxHash(tx.wrapper_hash)} <br />
        <b>Block ID:</b> {formatTxHash(tx.block_hash)} <br />
      </p>
      {tx_details}
    </>
  );
}

export function isShielded(tx: TX): boolean {
  if (tx.tx !== null) {
    if (
      JSON.stringify(tx.tx).includes(
        "tnam1pcqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzmefah"
      )
    ) {
      return true;
    }
  } else {
    if (tx.code_type === "tx_ibc") {
      return true;
    }
  }
  return false;
}

export function formatTxHash(hash: string): string {
  if (hash === undefined) {
    return "";
  }
  return hash.toUpperCase();
}

export function formatReturnCode(return_code: number) {
  return <p>{return_code == 0 ? "✅" : "❌"}</p>;
}

export function formatTxType(tx_type: string) {
  return tx_type
    .replace("tx_", "")
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
}

export default function TransactionList({ txs }: TransactionListTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-96 font-medium">Hash</TableHead>
            <TableHead className="font-medium">Success</TableHead>
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Height</TableHead>
            <TableHead className="font-medium">Time</TableHead>
            <TableHead className="font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {txs
            ? txs.map((tx) => (
                <Collapsible key={tx.tx_hash} asChild>
                  <>
                    <TableRow>
                      <TableCell className="max-w-96 font-mono truncate">
                        {formatTxHash(tx.tx_hash)}
                      </TableCell>
                      <TableCell>{formatReturnCode(tx.return_code)}</TableCell>
                      <TableCell>
                        {isShielded(tx) ? "Shielded" : ""}{" "}
                        {formatTxType(tx.code_type)}
                      </TableCell>
                      <TableCell>{tx.header_height}</TableCell>
                      <TableCell>
                        {new Date(tx.header_time).toLocaleString("en-US")}
                      </TableCell>
                      <TableCell>
                        <CollapsibleTrigger className="text-primary">
                          <ChevronRightIcon className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                      <TableRow>
                        <TableCell colSpan={6}>
                          {renderInternalTx(tx)}
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            : null}
        </TableBody>
      </Table>
    </>
  );
}
