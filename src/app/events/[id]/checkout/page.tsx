// // app/checkout/page.tsx
// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { bookingService } from '@/service/booking/bookingService';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';

// interface BookingData {
//   id: number;
//   event_id: number;
//   quantity: number;
//   total_price: number;
//   status: string;
// }

// export default function CheckoutPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const bookingId = searchParams.get('bookingId');
//   const [booking, setBooking] = useState<BookingData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (bookingId) {
//       fetchBookingDetails(bookingId);
//     }
//   }, [bookingId]);

//   const fetchBookingDetails = async (id: string) => {
//     try {
//       setLoading(true);
//       const response = await bookingService.getBookingById(id);
//       setBooking(response.data);
//     } catch (error) {
//       console.error('Error fetching booking:', error);
//       toast.error('Failed to load booking details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     // Implement payment logic here
//     toast.success('Redirecting to payment...');
//     // router.push('/payment');
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8 max-w-2xl">
//         <p>Loading booking details...</p>
//       </div>
//     );
//   }

//   if (!booking) {
//     return (
//       <div className="container mx-auto px-4 py-8 max-w-2xl">
//         <h1 className="text-2xl font-bold text-red-500">Booking not found</h1>
//         <p>Please try booking again.</p>
//         <Button onClick={() => router.push('/events')} className="mt-4">
//           Browse Events
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-2xl">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
//       <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
//         <div className="border-b pb-4">
//           <h2 className="font-semibold text-lg">Booking Summary</h2>
//         </div>
        
//         <div className="space-y-2">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Booking ID:</span>
//             <span className="font-medium">#{booking.id}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Tickets:</span>
//             <span className="font-medium">{booking.quantity}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Total Amount:</span>
//             <span className="font-bold text-xl text-blue-600">
//               ${booking.total_price.toFixed(2)}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Status:</span>
//             <span className="font-medium capitalize text-green-600">
//               {booking.status}
//             </span>
//           </div>
//         </div>

//         <div className="pt-4 border-t space-y-3">
//           <Button 
//             onClick={handlePayment} 
//             className="w-full py-6 text-lg"
//           >
//             Proceed to Payment
//           </Button>
//           <Button 
//             variant="outline" 
//             onClick={() => router.push('/events')} 
//             className="w-full"
//           >
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }