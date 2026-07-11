'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Ticket, DollarSign } from 'lucide-react';
import { Event } from '@/types/types';

export default function EventCard({ event }: { event: Event }) {
  // Format the date with proper timezone handling
  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Dhaka', // Bangladesh timezone
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Event Image */}
      <div className="relative h-48 w-full bg-gray-200">
        {event.photo_url ? (
          <Image
            src={event.photo_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">No Image</span>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2 line-clamp-1">{event.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {event.description}
        </p>

        {/* Event Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatEventTime(event.starts_at)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Ticket className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              {event.available_tickets} / {event.total_tickets} tickets
              available
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="font-semibold text-lg text-green-600">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </span>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="mb-4">
          {event.available_tickets > 0 ? (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
              {event.available_tickets} tickets left
            </span>
          ) : (
            <span className="inline-block bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
              Sold Out
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <Link
            href={`/events/${event.id}/book`}
            className={`flex-1 text-center px-4 py-2 rounded-lg font-medium transition-colors ${
              event.available_tickets > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
            }`}
          >
            Book Now
          </Link>
          <Link
            href={`/events/${event.id}`}
            className="flex-1 text-center px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
