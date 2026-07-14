import SuccessPageUI from '@/components/ui/SuccessPageUI';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading booking details...
        </div>
      }
    >
      <SuccessPageUI />
    </Suspense>
  );
};

export default page;
