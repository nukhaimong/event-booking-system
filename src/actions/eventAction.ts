'use server';

import { eventService } from '@/service/event/eventService';

export const createEvent = async (formData: FormData) => {
  return await eventService.createEvent(formData);
};
