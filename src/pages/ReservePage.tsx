import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format, startOfToday } from 'date-fns';
import { Calendar as CalendarIcon, CheckCircle2, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '@/src/config/site';
import {
  submitTableReservationRequest,
  type TableReservationRequest,
} from '@/src/services/reservations';
import { SeoHead } from '@/src/components/layout/SeoHead';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Calendar } from '@/src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { RevealBlock } from '@/src/components/ui/motion-primitives';
import { cn } from '@/src/lib/utils';
import { toast } from 'sonner';

const LUNCH_SLOTS = ['12:30', '13:00', '13:45', '14:15'];
const DINNER_SLOTS = ['19:00', '19:45', '20:30', '21:15', '21:45'];

const reserveSchema = z.object({
  guestName: z.string().trim().min(2, 'Please enter your full name.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number.')
    .max(20, 'Phone number appears too long.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  guests: z.string().min(1, 'Please choose guest count.'),
  specialRequest: z.string().max(400, 'Please keep notes under 400 characters.').optional(),
});

type ReserveFormValues = z.infer<typeof reserveSchema>;

export default function ReservePage() {
  const today = startOfToday();
  const [date, setDate] = React.useState<Date | undefined>(addDays(today, 1));
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [period, setPeriod] = React.useState<'Lunch' | 'Dinner'>('Dinner');
  const [timeSlot, setTimeSlot] = React.useState<string>('19:45');
  const [slotError, setSlotError] = React.useState<string | null>(null);
  const [confirmed, setConfirmed] = React.useState<TableReservationRequest | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReserveFormValues>({
    resolver: zodResolver(reserveSchema),
    defaultValues: {
      guestName: '',
      phone: '',
      email: '',
      guests: '2',
      specialRequest: '',
    },
  });

  const guestCountValue = watch('guests');
  const slots = period === 'Lunch' ? LUNCH_SLOTS : DINNER_SLOTS;

  const handlePeriodChange = (nextPeriod: 'Lunch' | 'Dinner') => {
    setPeriod(nextPeriod);
    setTimeSlot(nextPeriod === 'Lunch' ? LUNCH_SLOTS[0] : DINNER_SLOTS[1]);
    setSlotError(null);
  };

  const onSubmit = async (values: ReserveFormValues) => {
    if (!date) {
      setSlotError('Please select a dining date.');
      return;
    }
    if (!timeSlot) {
      setSlotError('Please choose a seating time slot.');
      return;
    }
    setSlotError(null);

    const record = await submitTableReservationRequest({
      date: format(date, 'yyyy-MM-dd'),
      servicePeriod: period,
      timeSlot,
      guests: Number(values.guests),
      guestName: values.guestName,
      phone: values.phone,
      email: values.email,
      specialRequest: values.specialRequest,
    });

    setConfirmed(record);
    toast.success(`Table request ${record.referenceNumber} saved.`);
  };

  return (
    <>
      <SeoHead
        title="Reserve a Table"
        description="Request a lunch or dinner table reservation at The Veranda, Grand Palace Hotel."
        path="/reserve"
        schemaType="Restaurant"
      />

      <section className="bg-sand pt-28 pb-12 border-b border-line">
        <div className="site-container space-y-3 max-w-2xl">
          <RevealBlock className="space-y-3">
            <p className="eyebrow">Table Reservation Request</p>
            <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-navy">
              Reserve a table at The Veranda
            </h1>
            <p className="text-base text-muted leading-relaxed">
              Submit your preferred date, seating window, and party size. Our dining host confirms requests directly by email or WhatsApp.
            </p>
          </RevealBlock>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="site-container max-w-3xl">
          {confirmed ? (
            <div className="rounded-[6px] border border-line bg-cream p-8 md:p-10 shadow-[var(--shadow-2)] space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-1" strokeWidth={1.5} />
                <div className="space-y-1">
                  <p className="eyebrow">Request recorded</p>
                  <h2 className="font-serif text-3xl text-navy">
                    Table Request Received
                  </h2>
                  <p className="text-sm text-muted">
                    Reference number{' '}
                    <strong className="text-navy tabular-nums">
                      {confirmed.referenceNumber}
                    </strong>
                    . Confirmation details have been prepared for {confirmed.email}.
                  </p>
                </div>
              </div>

              <dl className="rounded-[6px] border border-line bg-sand/50 p-5 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Guest Name</dt>
                  <dd className="font-medium text-charcoal">{confirmed.guestName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Date &amp; Seating</dt>
                  <dd className="tabular-nums text-charcoal">
                    {confirmed.date} at {confirmed.timeSlot} ({confirmed.servicePeriod})
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Party Size</dt>
                  <dd className="tabular-nums text-charcoal">
                    {confirmed.guests} {confirmed.guests === 1 ? 'guest' : 'guests'}
                  </dd>
                </div>
                {confirmed.specialRequest && (
                  <div className="flex justify-between gap-4 pt-2 border-t border-line">
                    <dt className="text-muted shrink-0">Special Note</dt>
                    <dd className="text-charcoal text-right">{confirmed.specialRequest}</dd>
                  </div>
                )}
              </dl>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="forest">
                  <a
                    href={buildWhatsAppUrl(
                      `Hello ${siteConfig.name}, I submitted table request ${confirmed.referenceNumber} for ${confirmed.guests} guests on ${confirmed.date} at ${confirmed.timeSlot} (${confirmed.servicePeriod}). Name: ${confirmed.guestName}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.5} />
                    Confirm on WhatsApp
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setConfirmed(null);
                    reset();
                  }}
                >
                  Make another request
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-[6px] border border-line bg-cream p-6 md:p-10 shadow-[var(--shadow-1)] space-y-6"
            >
              {/* Date + Party Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="reserve-date-btn" requiredMark>
                    Preferred date
                  </Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <button
                        id="reserve-date-btn"
                        type="button"
                        className="flex min-h-[44px] w-full items-center justify-between rounded-[2px] border border-line bg-cream px-3.5 py-2.5 text-sm text-charcoal hover:border-charcoal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                      >
                        <span className="tabular-nums">
                          {date ? format(date, 'EEE, dd MMM yyyy') : 'Select a date'}
                        </span>
                        <CalendarIcon className="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(next) => {
                          setDate(next);
                          setSlotError(null);
                          setCalendarOpen(false);
                        }}
                        disabled={{ before: today }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="reserve-guests" requiredMark>
                    Party size
                  </Label>
                  <Select
                    value={guestCountValue}
                    onValueChange={(val) => setValue('guests', val, { shouldValidate: true })}
                  >
                    <SelectTrigger id="reserve-guests" hasError={Boolean(errors.guests)}>
                      <SelectValue placeholder="Number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.guests && (
                    <p className="mt-1 text-xs text-error">{errors.guests.message}</p>
                  )}
                </div>
              </div>

              {/* Service Period + Time Slot Chips */}
              <div className="space-y-3 pt-2 border-t border-line">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Label className="mb-0" requiredMark>
                    Seating &amp; time slot
                  </Label>
                  <div className="inline-flex rounded-[2px] border border-line p-0.5 bg-sand">
                    {(['Lunch', 'Dinner'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePeriodChange(p)}
                        aria-pressed={period === p}
                        className={cn(
                          'min-h-[36px] px-4 text-xs font-medium rounded-[2px] transition-colors cursor-pointer',
                          period === p
                            ? 'bg-navy text-cream'
                            : 'text-charcoal hover:text-navy'
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2" role="group" aria-label="Time slots">
                  {slots.map((slot) => {
                    const active = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setTimeSlot(slot);
                          setSlotError(null);
                        }}
                        className={cn(
                          'min-h-[44px] rounded-[999px] px-5 text-sm font-medium tabular-nums transition-colors duration-150 cursor-pointer',
                          active
                            ? 'bg-navy text-cream'
                            : 'bg-sand text-charcoal border border-line hover:border-navy/40'
                        )}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <div aria-live="polite">
                  {slotError && <p className="text-xs text-error">{slotError}</p>}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4 pt-2 border-t border-line">
                <div>
                  <Label htmlFor="reserve-name" requiredMark>
                    Full name
                  </Label>
                  <Input
                    id="reserve-name"
                    placeholder="Enter your full name"
                    hasError={Boolean(errors.guestName)}
                    {...register('guestName')}
                  />
                  <div aria-live="polite">
                    {errors.guestName && (
                      <p className="mt-1 text-xs text-error">{errors.guestName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reserve-phone" requiredMark>
                      Phone number
                    </Label>
                    <Input
                      id="reserve-phone"
                      type="tel"
                      placeholder="+91 98000 00000"
                      hasError={Boolean(errors.phone)}
                      {...register('phone')}
                    />
                    <div aria-live="polite">
                      {errors.phone && (
                        <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reserve-email" requiredMark>
                      Email address
                    </Label>
                    <Input
                      id="reserve-email"
                      type="email"
                      placeholder="guest@example.com"
                      hasError={Boolean(errors.email)}
                      {...register('email')}
                    />
                    <div aria-live="polite">
                      {errors.email && (
                        <p className="mt-1 text-xs text-error">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reserve-notes">
                    Dietary notes or seating preference (optional)
                  </Label>
                  <Textarea
                    id="reserve-notes"
                    rows={3}
                    placeholder="Courtyard veranda table, allergies, or anniversary celebration"
                    hasError={Boolean(errors.specialRequest)}
                    {...register('specialRequest')}
                  />
                  {errors.specialRequest && (
                    <p className="mt-1 text-xs text-error">
                      {errors.specialRequest.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting request...' : 'Request table reservation'}
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
