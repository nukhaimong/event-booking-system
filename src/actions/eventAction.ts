'use server';

import { eventService } from '@/service/event/eventService';

export const createEvent = async (formData: FormData) => {
  return await eventService.createEvent(formData);
};
export const updateEvent = async (eventId: string, formData: FormData) => {
  return await eventService.updateEvent(eventId, formData);
};
export const getEventById = async (eventId: string) => {
  return await eventService.getEventById(eventId);
};
