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