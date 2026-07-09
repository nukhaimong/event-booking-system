const BASE_API = process.env.BASE_API

export const eventService = {
  getEvents: async () => {
    try {
      const response = await fetch(`${BASE_API}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (!response.ok) { 
        return { error: { message: result.message || "Failed to fetch events" } };
      }
      return result;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }
}

