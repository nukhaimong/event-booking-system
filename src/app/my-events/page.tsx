import MyEventCard from '@/components/event/myEventCard';
import Unauthorize from '@/components/ui/unauthorize';
import { eventService } from '@/service/event/eventService';
import { Event } from '@/types/types';

const MyEvents = async () => {
  const response = await eventService.getMyEvents();

  // Check if response has error
  if (response?.error) {
    return <Unauthorize message={response.error.message} />;
  }

  // Response is the events array
  const events: Event[] = response || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Events</h1>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven't created any events yet.
          </p>
          <a
            href="/create-event"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Event
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <MyEventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MyEvents;
