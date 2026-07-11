'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Event } from '@/types/types';
import { createBooking } from '@/actions/bookingAction';

// ✅ Corrected Zod schema
const bookingSchema = z.object({
  quantity: z
    .number()
    .int('Must be a whole number')
    .min(1, 'Must book at least 1 ticket'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  event: Event;
}

export default function BookingForm({ event }: BookingFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      quantity: 1,
    } as BookingFormData,

    validators: {
      onSubmit: bookingSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'booking';
      const { quantity } = value;

      // Check if enough tickets are available
      if (quantity > event.available_tickets) {
        toast.error(`Only ${event.available_tickets} tickets available`, {
          id: toastId,
        });
        return;
      }

      try {
        toast.loading('Processing your booking...', { id: toastId });

        // Call booking service
        const response = await createBooking({ event_id: event.id, quantity });

        console.log('Booking response:', response);

        if (response.error) {
          toast.error(
            response.error.message || 'Booking failed, please try again',
            {
              id: toastId,
            },
          );
          return;
        }

        toast.success('Booking successful!', { id: toastId });

        // Navigate to checkout page with booking id and checkout_url
        router.push(
          `/checkout?bookingId=${response.id}&checkout_url=${encodeURIComponent(response.checkout_url)}`,
        );
      } catch (error) {
        console.error('Booking error:', error);
        toast.error('Something went wrong. Please try again.', {
          id: toastId,
        });
      }
    },
  });

  return (
    <div className="border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Quantity Field */}
        <form.Field name="quantity">
          {(field) => (
            <div>
              <label
                className="text-sm font-medium block mb-1"
                htmlFor="quantity"
              >
                Number of Tickets
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={field.state.value}
                onChange={(e) => {
                  const value =
                    e.target.value === '' ? '' : Number(e.target.value);
                  field.handleChange(value as number);
                }}
                onBlur={field.handleBlur}
                placeholder="Enter number of tickets"
                className="max-w-[200px]"
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm mt-1">
                    {err?.message}
                  </p>
                ))}
              <p className="text-sm text-gray-500 mt-1">
                {event.available_tickets} tickets available
              </p>
            </div>
          )}
        </form.Field>
        {/* Book Now Button */}
        <Button
          type="submit"
          className="w-full md:w-auto px-8 py-3 text-lg"
          disabled={form.state.isSubmitting || event.available_tickets === 0}
        >
          {form.state.isSubmitting
            ? 'Processing...'
            : event.available_tickets === 0
              ? 'Sold Out'
              : 'Book Now'}
        </Button>

        {event.available_tickets === 0 && (
          <p className="text-red-500 text-sm">Sorry, this event is sold out!</p>
        )}
      </form>
    </div>
  );
}
