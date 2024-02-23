export const maxDuration = 180; // 3 minutes timeout

interface ProposalTallyProps {
  id: number;
}

export type TallyResponse = {
  result: string;
  thresh_frac: number;
  threshold: number;
  total_abstain_power: number;
  total_yay_power: number;
  total_nay_power: number;
  total_voting_power: number;
};

export async function getProposalTally(id: number): Promise<TallyResponse> {
  const res = await fetch(
    `${process.env.REST_API_BASE_URL}/proposal_result/${id}`,
    {
      next: { revalidate: 180 },
    }
  );

  if (!res.ok) {
    throw Error("failed to fetch proposal tally");
  }

  let data = await res.json();
  return data;
}

export default async function ProposalTally({ id }: ProposalTallyProps) {
  let data = await getProposalTally(id);

  return (
    <>
      <h3 className="text-xl font-bold tracking-tight">Yay</h3>
      <p className="">{data.total_yay_power}</p>

      <h3 className="text-xl font-bold tracking-tight mt-5">Nay</h3>
      <p className="">{data.total_nay_power}</p>

      <h3 className="text-xl font-bold tracking-tight mt-5">Result</h3>
      <p className="">{data.result}</p>
    </>
  );
}
