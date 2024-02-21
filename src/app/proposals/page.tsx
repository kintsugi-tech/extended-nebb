import { Proposal, ProposalsTable } from "@/components/proposals-table";

async function getProposals(): Promise<Proposal[]> {
  const res = await fetch(`${process.env.INDEXER_API_BASE_URL}/proposals`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw Error("failed to fetch proposals");
  }

  let data = await res.json();
  return data;
}

export default async function Proposals() {
  let data = await getProposals();

  return (
    <div className="container relative">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:pb-18">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-primary">
          Proposals
        </h1>
      </div>
      <div>
        <ProposalsTable elements={data} />
      </div>
    </div>
  );
}
