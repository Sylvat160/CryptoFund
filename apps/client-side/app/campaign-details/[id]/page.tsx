export default function CampaignDetails({
  params,
}: {
  params: { id: string };
}) {
  return <div>My Campaign: {params.id}</div>;
}
