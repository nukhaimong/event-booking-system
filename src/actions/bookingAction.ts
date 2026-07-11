'use server'

import { bookingService } from "@/service/bookings/bookingService"
import { CreateBookingPayload } from "@/types/types"

export const createBooking = async (payload: CreateBookingPayload) => {
  return await bookingService.createBooking(payload)
}