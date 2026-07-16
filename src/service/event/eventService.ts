import { cookies } from 'next/headers';

const BASE_API = process.env.BASE_API;

export const eventService = {
  getEvents: async () => {
    try {
      const response = await fetch(`${BASE_API}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (!response.ok) {
        return {
          error: { message: result.message || 'Failed to fetch events' },
        };
      }
      return result;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
  createEvent: async (formData: FormData) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
      const response = await fetch(`${BASE_API}/events/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        cache: 'no-store',
      });
      const result = await response.json();
      if (!response.ok) {
        return {
          error: { message: result.message || 'Failed to create event' },
        };
      }
      return result;
    } catch (error) {
      console.log('Error creating event:', error);
    }
  },
  getMyEvents: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
      const response = await fetch(`${BASE_API}/events/my-events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });
      const result = await response.json();
      if (!response.ok) {
        return {
          error: { message: result.message || 'Failed to fetch events' },
        };
      }

      return result;
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      throw error;
    }
  },
  getEventById: async (eventId: string) => {
    try {
      const response = await fetch(`${BASE_API}/events/${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      const result = await response.json();
      if (!response.ok) {
        return {
          error: { message: result.message || 'Failed to fetch event' },
        };
      }
      return result;
    } catch (error) {
      console.log('Failed to fetch event', error);
    }
  },
  updateEvent: async (eventId: string, formData: FormData) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
      const response = await fetch(`${BASE_API}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        cache: 'no-store',
      });
      const result = await response.json();
      if (!response.ok) {
        return {
          error: { message: result.message || 'Failed to update event' },
        };
      }
      return result;
    } catch (error) {
      console.log('Failed to update event: ', error);
      return {
        error: {
          message:
            error instanceof Error ? error.message : 'Failed to update event',
        },
      };
    }
  },
};
