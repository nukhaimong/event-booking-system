import BookingPageUI from '@/components/booking/BookingPageUI';
import React, { Suspense } from 'react';

const BookingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading booking details...
        </div>
      }
    >
      <BookingPageUI />
    </Suspense>
  );
};

export default BookingPage;
