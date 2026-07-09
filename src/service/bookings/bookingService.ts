
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
  }
}