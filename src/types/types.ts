export interface Event {
  id: number;
  user_id: number;
  title: string;
  description: string;
  location: string;
  starts_at: string;
  total_tickets: number;
  available_tickets: number;
  price: number;
  created_at: string;
  photo_url: string;
}

export interface Booking {
  id: number;
  user_id: number;
  event_id: number;
  quantity: number;
  total_price: number;
  status: string;
  booking_code: string;
  created_at: string;
}

export interface CreateBookingPayload {
  event_id: number;
  quantity: number;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  location: string;
  starts_at: string;
  total_tickets: number;
  price: number;
  photo: File;
}

export interface BookingResponse {
  id: string;
  user_id: string;
  event_id: string;
  quantity: number;
  total_price: number;
  status: string;
  booking_code: string;
  created_at: string;
  checkout_url: string;
}
