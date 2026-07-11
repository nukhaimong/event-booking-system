'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookingResponse } from '@/types/types';
import { GetBookingById } from '@/actions/bookingAction';
import { toast } from 'sonner';

const BookingPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const checkoutUrl = searchParams.get('checkout_url');
  const router = useRouter();
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setError('No booking ID provided');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await GetBookingById(bookingId as string);
        console.log(response);

        // Check if response has error
        if (!response || 'error' in response) {
          setError(response?.error?.message || 'Booking not found');
          setBooking(null);
        } else {
          setBooking(response);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    if (checkoutUrl) {
      router.push(checkoutUrl);
    } else {
      toast.error('Checkout URL not available');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'The booking you are looking for does not exist.'}
          </p>
          <Link
            href="/events"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Booking Confirmation
          </h1>
          <p className="mt-2 text-gray-600">Thank you for your booking!</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 sm:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Booking Code
                </p>
                <p className="text-white text-2xl font-bold tracking-wider">
                  {booking.booking_code}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusColor(booking.status)}`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Booking ID */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 font-medium">Booking ID</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  #{booking.id}
                </p>
              </div>

              {/* Event ID */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 font-medium">Event ID</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  #{booking.event_id}
                </p>
              </div>

              {/* Tickets */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 font-medium">
                  Number of Tickets
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {booking.quantity}{' '}
                  {booking.quantity === 1 ? 'Ticket' : 'Tickets'}
                </p>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 font-medium">Total Price</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  ${booking.total_price.toFixed(2)}
                </p>
              </div>

              {/* Created At */}
              <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                <p className="text-sm text-gray-500 font-medium">
                  Booking Date
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {formatDate(booking.created_at)}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Note:</span> Please proceed
                    to checkout to complete your booking. You will be redirected
                    to our secure payment page.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* ✅ Next.js navigation with useRouter */}
              <button
                onClick={handleCheckout}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Proceed to Checkout
              </button>

              {/* Back to Events using Link */}
              <Link
                href="/events"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 text-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Browse More Events
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>If you have any questions, please contact our support team.</p>
          <p className="mt-1">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
