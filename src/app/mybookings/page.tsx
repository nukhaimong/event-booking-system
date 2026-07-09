import BookingCard from '@/components/booking/BookingCard';
import { bookingService } from '@/service/bookings/bookingService';
import { Booking } from '@/types/types';
import { Calendar, Ticket, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';



const MyBookingsPage = async () => {
  const myBookings: Booking[] = await bookingService.getMyBookings();

  // Group bookings by status
  const confirmedBookings = myBookings?.filter(b => b.status.toLowerCase() === 'confirmed') || [];
  const pendingBookings = myBookings?.filter(b => b.status.toLowerCase() === 'pending') || [];
  const cancelledBookings = myBookings?.filter(b => b.status.toLowerCase() === 'cancelled') || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">My Bookings</h1>
      <p className="text-gray-500 text-center mb-8">
        Manage all your event bookings in one place
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">{confirmedBookings.length}</h3>
          <p className="text-sm text-gray-500">Confirmed</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-2xl font-bold text-yellow-600">{pendingBookings.length}</h3>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-2xl font-bold text-red-600">{cancelledBookings.length}</h3>
          <p className="text-sm text-gray-500">Cancelled</p>
        </div>
      </div>

      {/* Bookings List */}
      {!myBookings || myBookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <div className="flex justify-center mb-4">
            <Ticket className="w-16 h-16 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
          <Link
            href="/events"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Confirmed Bookings */}
          {confirmedBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Confirmed Bookings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {confirmedBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          {/* Pending Bookings */}
          {pendingBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending Bookings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          {/* Cancelled Bookings */}
          {cancelledBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Cancelled Bookings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cancelledBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;