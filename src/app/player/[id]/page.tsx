export default function PlayerPage({ params }: { params: { id: string } }) {
  return <div>My Post: {params.id}</div>;
}
