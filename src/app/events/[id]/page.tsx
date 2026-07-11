// app/events/[id]/page.tsx
import BookingForm from '@/components/booking/bookingForm';
import { eventService } from '@/service/event/eventService';
import { Event } from '@/types/types';
import { formatEventTime } from '@/utils/dataUtils';

type Params = {
  id: string;
};

const GetSingleEvent = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const event: Event = await eventService.getEventById(id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Event Details */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Event Image */}
        {event.photo_url && (
          <div className="w-full h-96 relative">
            <img
              src={event.photo_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>

          {/* Event Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">📍 Location</p>
              <p className="font-medium">{event.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">📅 Date & Time</p>
              <p className="font-medium">{formatEventTime(event.starts_at)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">🎫 Available Tickets</p>
              <p className="font-medium">
                {event.available_tickets} / {event.total_tickets}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">💰 Price per Ticket</p>
              <p className="font-medium">${event.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">About this event</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Booking Form - Client Component */}
          <BookingForm event={event} />
        </div>
      </div>
    </div>
  );
};

export default GetSingleEvent;
