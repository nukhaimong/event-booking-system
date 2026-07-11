'use client';

import Link from 'next/link';
import {
  Calendar,
  Ticket,
  DollarSign,
  Hash,
  User,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { Booking } from '@/types/types';

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="w-4 h-4 mr-1" />,
          label: 'Confirmed',
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="w-4 h-4 mr-1" />,
          label: 'Pending',
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <XCircle className="w-4 h-4 mr-1" />,
          label: 'Cancelled',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: null,
          label: status,
        };
    }
  };

  const statusInfo = getStatusBadge(booking.status);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        {/* Header with Booking Code */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-md">
              {booking.booking_code}
            </span>
          </div>
          <div
            className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
          >
            {statusInfo.icon}
            {statusInfo.label}
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              Booked on:{' '}
              {new Date(booking.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Ticket className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              {booking.quantity} ticket{booking.quantity > 1 ? 's' : ''} booked
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="font-semibold text-lg text-green-600">
              ${booking.total_price.toFixed(2)}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              (${(booking.total_price / booking.quantity).toFixed(2)} per
              ticket)
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Booking ID: #{booking.id}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
          <Link
            href={`/events/${booking.event_id}`}
            className="flex-1 text-center px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            View Event
          </Link>
          {booking.status.toLowerCase() === 'confirmed' && (
            <Link
              href={`/bookings/${booking.id}/ticket`}
              className="flex-1 text-center px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              View Ticket
            </Link>
          )}
          {booking.status.toLowerCase() === 'pending' && (
            <button
              onClick={() => {
                // Handle cancel booking
                console.log('Cancel booking:', booking.id);
              }}
              className="flex-1 text-center px-4 py-2 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
