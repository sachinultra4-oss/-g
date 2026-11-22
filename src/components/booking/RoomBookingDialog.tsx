import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, differenceInCalendarDays } from 'date-fns';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import type { Room } from '@/src/data/rooms';
import { buildWhatsAppUrl, siteConfig } from '@/src/config/site';
import { formatINR } from '@/src/lib/utils';
import {
  submitRoomBookingRequest,
  type RoomBookingRequest,
} from '@/src/services/reservations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { DateRangePicker } from '@/src/components/ui/date-range-picker';
import { toast } from 'sonner';

const bookingSchema = z.object({
  guestName: z.string().trim().min(2, 'Please enter your full name.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number.')
    .max(20, 'Phone number appears too long.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  adults: z.coerce.number().int().min(1, 'At least 1 adult is required.'),
  children: z.coerce.number().int().min(0),
  note: z.string().max(400, 'Please keep notes under 400 characters.').optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface RoomBookingDialogProps {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialRange?: DateRange;
  blockedDates: Date[];
  initialAdults?: number;
  initialChildren?: number;
}

export function RoomBookingDialog({
  room,
  open,
  onOpenChange,
  initialRange,
  blockedDates,
  initialAdults = 2,
  initialChildren = 0,
}: RoomBookingDialogProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(initialRange);
  const [dateError, setDateError] = React.useState<string | null>(null);
  const [confirmed, setConfirmed] = React.useState<RoomBookingRequest | null>(null);

  React.useEffect(() => {
    setDateRange(initialRange);
  }, [initialRange]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as never,
    defaultValues: {
      guestName: '',
      phone: '',
      email: '',
      adults: Math.min(initialAdults, room.maxAdults),
      children: Math.min(initialChildren, room.maxChildren),
      note: '',
    },
  });

  const nights =
    dateRange?.from && dateRange?.to
      ? Math.max(0, differenceInCalendarDays(dateRange.to, dateRange.from))
      : 0;
  const subtotal = nights * room.ratePerNight;
  const tax = Math.round(subtotal * siteConfig.taxRate);
  const total = subtotal + tax;

  const onSubmit = async (values: BookingFormValues) => {
    if (!dateRange?.from || !dateRange?.to) {
      setDateError('Please select check-in and check-out dates.');
      return;
    }
    if (dateRange.to <= dateRange.from) {
      setDateError('Check-out must be after check-in.');
      return;
    }
    if (values.adults + values.children > room.maxGuests) {
      setDateError(`This room accommodates up to ${room.maxGuests} guests total.`);
      return;
    }
    setDateError(null);

    const record = await submitRoomBookingRequest({
      roomId: room.id,
      roomName: room.name,
      checkIn: format(dateRange.from, 'yyyy-MM-dd'),
      checkOut: format(dateRange.to, 'yyyy-MM-dd'),
      nights,
      adults: values.adults,
      children: values.children,
      subtotal,
      tax,
      total,
      guestName: values.guestName,
      phone: values.phone,
      email: values.email,
      note: values.note,
    });

    setConfirmed(record);
    toast.success(`Request ${record.referenceNumber} saved.`);
  };

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        setConfirmed(null);
        setDateError(null);
        reset();
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        {confirmed ? (
          <div className="space-y-6 py-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <p className="eyebrow">Request recorded</p>
                <DialogTitle className="mt-1">Room Booking Request Received</DialogTitle>
                <DialogDescription className="mt-1">
                  Reference number <strong className="text-navy tabular-nums">{confirmed.referenceNumber}</strong>.
                  A summary has been prepared for {confirmed.email} and our reservations desk.
                </DialogDescription>
              </div>
            </div>

            <div className="rounded-[6px] border border-line bg-sand/60 p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Room</span>
                <span className="font-medium text-charcoal">{confirmed.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Dates</span>
                <span className="tabular-nums text-charcoal">
                  {confirmed.checkIn} to {confirmed.checkOut} ({confirmed.nights} nights)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Guests</span>
                <span className="tabular-nums text-charcoal">
                  {confirmed.adults} adults{confirmed.children > 0 ? `, ${confirmed.children} children` : ''}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-line font-medium text-navy">
                <span>Estimated total (incl. 12% tax)</span>
                <span className="tabular-nums">{formatINR(confirmed.total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="forest" className="flex-1">
                <a
                  href={buildWhatsAppUrl(
                    `Hello ${siteConfig.name}, I submitted room request ${confirmed.referenceNumber} for ${confirmed.roomName} (${confirmed.checkIn} to ${confirmed.checkOut}, ${confirmed.adults} adults). Name: ${confirmed.guestName}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  Confirm on WhatsApp
                </a>
              </Button>
              <Button variant="outline" onClick={() => handleClose(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <p className="eyebrow">{room.category}</p>
              <DialogTitle>Request {room.name}</DialogTitle>
              <DialogDescription>
                Submit your preferred dates and contact details. Our front desk confirms availability without upfront payment.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-2">
              <div>
                <Label htmlFor="booking-dates" requiredMark>
                  Stay dates
                </Label>
                <DateRangePicker
                  id="booking-dates"
                  value={dateRange}
                  onChange={(next) => {
                    setDateRange(next);
                    setDateError(null);
                  }}
                  disabledDates={blockedDates}
                  hasError={Boolean(dateError)}
                />
                <div aria-live="polite">
                  {dateError && <p className="mt-1 text-xs text-error">{dateError}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="booking-adults" requiredMark>
                    Adults (max {room.maxAdults})
                  </Label>
                  <Input
                    id="booking-adults"
                    type="number"
                    min={1}
                    max={room.maxAdults}
                    hasError={Boolean(errors.adults)}
                    {...register('adults')}
                  />
                  {errors.adults && (
                    <p className="mt-1 text-xs text-error">{errors.adults.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="booking-children">
                    Children (max {room.maxChildren})
                  </Label>
                  <Input
                    id="booking-children"
                    type="number"
                    min={0}
                    max={room.maxChildren}
                    hasError={Boolean(errors.children)}
                    {...register('children')}
                  />
                  {errors.children && (
                    <p className="mt-1 text-xs text-error">{errors.children.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="booking-name" requiredMark>
                  Full name
                </Label>
                <Input
                  id="booking-name"
                  placeholder="Enter your full name"
                  hasError={Boolean(errors.guestName)}
                  {...register('guestName')}
                />
                {errors.guestName && (
                  <p className="mt-1 text-xs text-error">{errors.guestName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="booking-phone" requiredMark>
                    Phone number
                  </Label>
                  <Input
                    id="booking-phone"
                    type="tel"
                    placeholder="+91 98000 00000"
                    hasError={Boolean(errors.phone)}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="booking-email" requiredMark>
                    Email address
                  </Label>
                  <Input
                    id="booking-email"
                    type="email"
                    placeholder="guest@example.com"
                    hasError={Boolean(errors.email)}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-error">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="booking-note">Special requests (optional)</Label>
                <Textarea
                  id="booking-note"
                  rows={3}
                  placeholder="Airport transfer, early arrival, or bedding preferences"
                  hasError={Boolean(errors.note)}
                  {...register('note')}
                />
                {errors.note && (
                  <p className="mt-1 text-xs text-error">{errors.note.message}</p>
                )}
              </div>

              {nights > 0 && (
                <div className="rounded-[6px] border border-line bg-sand/50 p-3.5 text-sm space-y-1">
                  <div className="flex justify-between text-muted">
                    <span className="tabular-nums">
                      {nights} {nights === 1 ? 'night' : 'nights'} &times; {formatINR(room.ratePerNight)}
                    </span>
                    <span className="tabular-nums">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Taxes &amp; GST (12%)</span>
                    <span className="tabular-nums">{formatINR(tax)}</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-line font-semibold text-navy">
                    <span>Estimated total</span>
                    <span className="tabular-nums">{formatINR(total)}</span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending request...' : 'Submit room request'}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
