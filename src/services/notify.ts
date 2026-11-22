export interface NotificationPayload {
  type: 'room_booking' | 'table_reservation' | 'contact_enquiry';
  referenceNumber: string;
  guestName: string;
  guestEmail: string;
  summary: string;
}

export interface NotificationResult {
  guestNotified: boolean;
  hotelNotified: boolean;
  dispatchedAt: string;
}

/**
 * Email dispatch stub for Package A.
 * Replace this body with a backend API or Supabase Edge Function call when moving to production.
 */
export async function sendBookingNotifications(
  payload: NotificationPayload
): Promise<NotificationResult> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  if (import.meta.env.DEV) {
    console.info('[Notify Stub] Email dispatch queued:', payload);
  }
  return {
    guestNotified: true,
    hotelNotified: true,
    dispatchedAt: new Date().toISOString(),
  };
}
