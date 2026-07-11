'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { createEvent } from '@/actions/eventAction';

const isFutureDate = (dateString: string) => {
  const selectedDate = new Date(dateString);
  const now = new Date();
  return selectedDate > now;
};

// Zod schema
const createEventSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(150, 'Title too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description too long'),
  location: z.string().min(1, 'Location is required'),
  startsAt: z
    .string()
    .min(1, 'Date and time is required')
    .refine((date) => isFutureDate(date), {
      message: 'Event date must be in the future',
    }),
  totalTickets: z
    .number()
    .min(1, 'Must have at least 1 ticket')
    .nonnegative('Total tickets cannot be negative'),
  price: z.number().min(0, 'Price cannot be negative'),
  photo: z.instanceof(File, { message: 'Photo is required' }),
});

type CreateEventFormData = z.infer<typeof createEventSchema>;

export default function CreateEventForm() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      startsAt: '',
      totalTickets: 1,
      price: 0,
      photo: undefined as File | undefined,
    } as CreateEventFormData,

    validators: {
      onSubmit: createEventSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'creating-event';
      console.log('Form Values:', value);

      try {
        toast.loading('Creating event...', { id: toastId });

        const formattedStartsAt = value.startsAt.replace('T', ' ') + ':00';

        // Create FormData
        const formData = new FormData();
        formData.append('title', value.title);
        formData.append('description', value.description);
        formData.append('location', value.location);
        formData.append('starts_at', formattedStartsAt);
        formData.append('total_tickets', String(value.totalTickets));
        formData.append('price', String(value.price));
        if (value.photo) {
          formData.append('photo', value.photo);
        }

        const response = await createEvent(formData);

        if (response?.error) {
          toast.error(response.error.message || 'Failed to create event', {
            id: toastId,
          });
          return;
        }

        toast.success('Event created successfully!', { id: toastId });
        router.push('/my-events');
        router.refresh();
      } catch (error) {
        console.error('Error creating event:', error);
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 border rounded-xl shadow-sm mb-20">
      <h2 className="text-2xl font-bold mb-8 text-center">Create Event</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* TITLE */}
        <form.Field name="title">
          {(field) => (
            <div>
              <label className="text-sm font-medium block mb-1" htmlFor="title">
                Title
              </label>
              <Input
                id="title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter event title"
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm mt-1">
                    {err?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

        {/* DESCRIPTION */}
        <form.Field name="description">
          {(field) => (
            <div>
              <label
                className="text-sm font-medium block mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Describe your event"
                rows={4}
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm mt-1">
                    {err?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

        {/* LOCATION */}
        <form.Field name="location">
          {(field) => (
            <div>
              <label
                className="text-sm font-medium block mb-1"
                htmlFor="location"
              >
                Location
              </label>
              <Input
                id="location"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter event location"
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm mt-1">
                    {err?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

        {/* DATE & TIME */}
        <form.Field name="startsAt">
          {(field) => (
            <div>
              <label
                className="text-sm font-medium block mb-1"
                htmlFor="startsAt"
              >
                Date & Time
              </label>
              <Input
                id="startsAt"
                type="datetime-local"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <p className="text-xs text-gray-500 mt-1">
                Select date and time for your event
              </p>
              {field.state.meta.isTouched &&
                field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm mt-1">
                    {err?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

        {/* TOTAL TICKETS - FIXED */}
        <form.Field name="totalTickets">
          {(field) => (
            <div>
              <label
                className="text-sm font-medium block mb-1"
                htmlFor="totalTickets"
              >
                Total Tickets
              </label>
              <Input
                id="totalTickets"
                type="number"
                min="1"
                value={field.state.value === 0 ? '' : field.state.value}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    field.handleChange(0);
                    return;
                  }
                  const num = Number(val);
                  if (!isNaN(num) && num >= 0) {
                    field.handleChange(num);
                  }
                }}
                onBlur={field.handleBlur}
                placeholder="Number of tickets"
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm mt-1">
                    {err?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

        {/* PRICE - FIXED */}
        <form.Field name="price">
          {(field) => (
            <div>
              <label className="text-sm font-medium block mb-1" htmlFor="price">
                Price per Ticket
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                step="1"
                value={field.state.value === 0 ? '' : field.state.value}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    field.handleChange(0);
                    return;
                  }
                  const num = Number(val);
                  if (!isNaN(num) && num >= 0) {
                    field.handleChange(num);
                  }
                }}
                onBlur={field.handleBlur}
                placeholder="Price in your currency"
              />
              <p className="text-xs text-gray-500 mt-1">
                Set to 0 for free events
              </p>
              {field.state.meta.isTouched &&
                field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm mt-1">
                    {err?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

        {/* PHOTO WITH PREVIEW */}
        <form.Field name="photo">
          {(field) => (
            <div>
              <label className="text-sm font-medium block mb-1" htmlFor="photo">
                Event Photo
              </label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.handleChange(file);
                    // Create preview URL
                    const previewUrl = URL.createObjectURL(file);
                    setImagePreview(previewUrl);
                  } else {
                    field.handleChange(undefined as unknown as File);
                    setImagePreview(null);
                  }
                }}
                onBlur={field.handleBlur}
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3 relative w-full max-w-sm">
                  <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                    <Image
                      src={imagePreview}
                      alt="Event preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      field.handleChange(undefined as unknown as File);
                      // Reset file input
                      const fileInput = document.getElementById(
                        'photo',
                      ) as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {field.state.meta.isTouched &&
                field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-sm mt-1">
                    {err?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

        {/* SUBMIT */}
        <Button
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? 'Creating Event...' : 'Create Event'}
        </Button>
      </form>
    </div>
  );
}
