
import { CreateBookingPayload } from "@/types/types";
import { cookies } from "next/headers";

const BASE_API = process.env.BASE_API;

export const bookingService = {
  getMyBookings: async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    try {
      const response = await fetch(`${BASE_API}/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        cache: "no-store"
      });
      const result = await response.json();
      if(!response.ok) {
        return {error: {message: result.message || "Failed to fetch bookings"}};
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      throw error;
    }
  },
  createBooking: async (payload: CreateBookingPayload) => {
    try {
      const response = await fetch(`${BASE_API}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json();
      if(!response.ok) {
        return {error: {message: result.message || "Failed to create booking"}};
      }
      return result;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }
}