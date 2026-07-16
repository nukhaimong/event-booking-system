import EventCard from '@/components/event/eventCard';
import { eventService } from '@/service/event/eventService';
import { Event } from '@/types/types';

const EventPage = async () => {
  const response: Event[] = await eventService.getEvents();
  const events: Event[] = response.filter(
    (event: Event) => new Date(event.starts_at).getTime() > Date.now(),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>

      {!events || events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No events available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPage;
