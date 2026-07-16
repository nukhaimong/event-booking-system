'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getEventById, updateEvent } from '@/actions/eventAction';
import {
  Calendar,
  MapPin,
  Ticket,
  DollarSign,
  Image as ImageIcon,
  X,
  Upload,
  Sparkles,
  Clock,
  FileText,
  Loader2,
  Plus,
  Pencil,
} from 'lucide-react';
import { Event } from '@/types/types';

const isFutureDate = (dateString: string) => {
  const selectedDate = new Date(dateString);
  const now = new Date();
  return selectedDate > now;
};

// Zod schema with all fields optional
const updateEventSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(150, 'Title too long')
    .optional(),
  description: z.string().min(1, 'Description is required').optional(),
  location: z.string().min(1, 'Location is required').optional(),
  startsAt: z
    .string()
    .min(1, 'Date and time is required')
    .refine((date) => isFutureDate(date), {
      message: 'Event date must be in the future',
    })
    .optional(),
  totalTickets: z
    .number()
    .min(1, 'Must have at least 1 ticket')
    .nonnegative('Total tickets cannot be negative')
    .optional(),
  price: z.number().min(0, 'Price cannot be negative').optional(),
  photo: z.instanceof(File, { message: 'Photo is required' }).optional(),
});

type UpdateEventFormData = z.infer<typeof updateEventSchema>;

interface UpdateEventFormProps {
  eventId: string;
}

export default function UpdateEventForm({ eventId }: UpdateEventFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      startsAt: '',
      totalTickets: 1,
      price: 0,
      photo: undefined as File | undefined,
    } as UpdateEventFormData,

    validators: {
      onSubmit: updateEventSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'updating-event';

      try {
        toast.loading('Updating event...', { id: toastId });

        const formData = new FormData();

        // Only append fields that have been changed (not empty)
        if (value.title) formData.append('title', value.title);
        if (value.description)
          formData.append('description', value.description);
        if (value.location) formData.append('location', value.location);
        if (value.startsAt) {
          const formattedStartsAt = value.startsAt.replace('T', ' ') + ':00';
          formData.append('starts_at', formattedStartsAt);
        }
        if (value.totalTickets)
          formData.append('total_tickets', String(value.totalTickets));
        if (value.price !== undefined)
          formData.append('price', String(value.price));
        if (value.photo) {
          formData.append('photo', value.photo);
        }
        const response = await updateEvent(eventId, formData);
        console.log(response);

        if (response?.error) {
          toast.error(response.error.message || 'Failed to update event', {
            id: toastId,
          });
          return;
        }

        toast.success('Event updated successfully!', { id: toastId });
        router.push('/my-events');
      } catch (error) {
        console.error('Error updating event:', error);
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  // Fetch event data on mount
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const response = await getEventById(eventId);

        if (response?.error) {
          toast.error(response.error.message || 'Failed to load event');
          router.push('/my-events');
          return;
        }

        const event: Event = response.data || response;

        // Set form values
        form.setFieldValue('title', event.title || '');
        form.setFieldValue('description', event.description || '');
        form.setFieldValue('location', event.location || '');

        // Format date for datetime-local input
        if (event.starts_at) {
          const formattedDate = event.starts_at.replace(' ', 'T').slice(0, 16);
          form.setFieldValue('startsAt', formattedDate);
        }

        form.setFieldValue('totalTickets', event.total_tickets || 1);
        form.setFieldValue('price', event.price || 0);

        // Set current photo URL for preview
        if (event.photo_url) {
          setCurrentPhotoUrl(event.photo_url);
          setImagePreview(event.photo_url);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Failed to load event data');
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId, form, router]);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      form.setFieldValue('photo', file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setCurrentPhotoUrl(null); // Clear the current photo URL when new one is selected
    } else {
      toast.error('Please select an image file');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setCurrentPhotoUrl(null);
    form.setFieldValue('photo', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                <Pencil className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Update Your Event
              </h1>
              <p className="text-blue-100 max-w-md mx-auto">
                Update the details of your event. Leave fields empty to keep
                current values.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-8"
            >
              {/* Two column layout for better visual balance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* TITLE */}
                  <form.Field name="title">
                    {(field) => (
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 block mb-1.5 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          Event Title
                          <span className="text-xs text-gray-400">
                            (optional)
                          </span>
                        </label>
                        <Input
                          id="title"
                          value={field.state.value || ''}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Enter a catchy event title"
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors?.map((err, i) => (
                            <p
                              key={i}
                              className="text-red-500 text-sm mt-1.5 flex items-center gap-1"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                              {err?.message}
                            </p>
                          ))}
                      </div>
                    )}
                  </form.Field>

                  {/* LOCATION */}
                  <form.Field name="location">
                    {(field) => (
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 block mb-1.5 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          Location
                          <span className="text-xs text-gray-400">
                            (optional)
                          </span>
                        </label>
                        <Input
                          id="location"
                          value={field.state.value || ''}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Where will your event take place?"
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors?.map((err, i) => (
                            <p
                              key={i}
                              className="text-red-500 text-sm mt-1.5 flex items-center gap-1"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                              {err?.message}
                            </p>
                          ))}
                      </div>
                    )}
                  </form.Field>

                  {/* DATE & TIME */}
                  <form.Field name="startsAt">
                    {(field) => (
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 block mb-1.5 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          Date & Time
                          <span className="text-xs text-gray-400">
                            (optional)
                          </span>
                        </label>
                        <div className="relative">
                          <Input
                            id="startsAt"
                            type="datetime-local"
                            value={field.state.value || ''}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Must be in the future
                        </p>
                        {field.state.meta.isTouched &&
                          field.state.meta.errors?.map((err, i) => (
                            <p
                              key={i}
                              className="text-red-500 text-sm mt-1.5 flex items-center gap-1"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                              {err?.message}
                            </p>
                          ))}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* DESCRIPTION */}
                  <form.Field name="description">
                    {(field) => (
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-700 block mb-1.5 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          Description
                          <span className="text-xs text-gray-400">
                            (optional)
                          </span>
                        </label>
                        <Textarea
                          id="description"
                          value={field.state.value || ''}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Tell attendees what your event is about..."
                          rows={5}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 resize-none"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors?.map((err, i) => (
                            <p
                              key={i}
                              className="text-red-500 text-sm mt-1.5 flex items-center gap-1"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                              {err?.message}
                            </p>
                          ))}
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>

              {/* Two column for tickets and price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* TOTAL TICKETS */}
                <form.Field name="totalTickets">
                  {(field) => (
                    <div className="group">
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5 flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-blue-500" />
                        Total Tickets
                        <span className="text-xs text-gray-400">
                          (optional)
                        </span>
                      </label>
                      <div className="relative">
                        <Input
                          id="totalTickets"
                          type="number"
                          min="1"
                          value={field.state.value || ''}
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
                          placeholder="Number of tickets available"
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        />
                      </div>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors?.map((err, i) => (
                          <p
                            key={i}
                            className="text-red-500 text-sm mt-1.5 flex items-center gap-1"
                          >
                            <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                            {err?.message}
                          </p>
                        ))}
                    </div>
                  )}
                </form.Field>

                {/* PRICE */}
                <form.Field name="price">
                  {(field) => (
                    <div className="group">
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-500" />
                        Price per Ticket
                        <span className="text-xs text-gray-400">
                          (optional)
                        </span>
                      </label>
                      <div className="relative">
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          step="1"
                          value={field.state.value || ''}
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
                          placeholder="Price in USD"
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-green-400"></span>
                        Set to 0 for free events
                      </p>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors?.map((err, i) => (
                          <p
                            key={i}
                            className="text-red-500 text-sm mt-1.5 flex items-center gap-1"
                          >
                            <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                            {err?.message}
                          </p>
                        ))}
                    </div>
                  )}
                </form.Field>
              </div>

              {/* PHOTO WITH PREVIEW - Full width */}
              <form.Field name="photo">
                {(field) => (
                  <div className="group">
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-500" />
                      Event Photo
                      <span className="text-xs text-gray-400">(optional)</span>
                    </label>

                    {!imagePreview ? (
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                          isDragging
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
                        }`}
                        onDragEnter={handleDragOver}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-gray-700 font-medium">
                              Upload a new image
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Drag & drop or click to browse
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              Supports JPG, PNG, WEBP (Max 5MB)
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Choose File
                            </Button>
                          </div>
                          <Input
                            ref={fileInputRef}
                            id="photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            onBlur={field.handleBlur}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                          <div className="relative h-64 w-full">
                            <Image
                              src={imagePreview}
                              alt="Event preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:scale-110"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <p className="text-white text-sm font-medium">
                              {currentPhotoUrl
                                ? 'Current Event Photo'
                                : 'New Event Photo'}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center mt-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Change Photo
                          </Button>
                          <Input
                            ref={fileInputRef}
                            id="photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    )}

                    {field.state.meta.isTouched &&
                      field.state.meta.errors?.map((err, i) => (
                        <p
                          key={i}
                          className="text-red-500 text-sm mt-1.5 flex items-center gap-1"
                        >
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                          {err?.message}
                        </p>
                      ))}
                  </div>
                )}
              </form.Field>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  disabled={form.state.isSubmitting}
                >
                  {form.state.isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating Event...
                    </>
                  ) : (
                    <>
                      <Pencil className="w-5 h-5" />
                      Update Event
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/my-events')}
                  className="flex-1 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Update Tips
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
              Only fill in the fields you want to update
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
              Upload a new photo to change the event image
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
              Update the date to a future time only
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
              Leave fields empty to keep current values
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
