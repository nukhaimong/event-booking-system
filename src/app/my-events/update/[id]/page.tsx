import UpdateEventForm from '@/components/event/updateEventForm';

export default async function UpdateEventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <UpdateEventForm eventId={id} />;
}
