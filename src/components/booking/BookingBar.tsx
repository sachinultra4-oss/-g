import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, startOfToday } from 'date-fns';
import { Calendar as CalendarIcon, Minus, Plus, Users } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/src/components/ui/button';
import { Calendar } from '@/src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { cn } from '@/src/lib/utils';

export function BookingBar() {
  const navigate = useNavigate();
  const today = startOfToday();

  const [range, setRange] = React.useState<DateRange | undefined>({
    from: addDays(today, 2),
    to: addDays(today, 4),
  });
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [guestsOpen, setGuestsOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!range?.from || !range?.to) {
      setError('Please select both check-in and check-out dates.');
      return;
    }
    if (range.to <= range.from) {
      setError('Check-out must be after check-in.');
      return;
    }
    if (adults < 1) {
      setError('At least 1 adult guest is required.');
      return;
    }

    setError(null);
    const params = new URLSearchParams({
      checkIn: format(range.from, 'yyyy-MM-dd'),
      checkOut: format(range.to, 'yyyy-MM-dd'),
      adults: String(adults),
      children: String(children),
    });
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="site-container relative z-20 -mt-12 md:-mt-14">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-[6px] border border-line bg-cream p-4 md:p-5 shadow-[var(--shadow-3)]"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
          {/* Check-in */}
          <div className="md:col-span-3">
            <label
              htmlFor="hero-checkin-btn"
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-muted mb-1.5"
            >
              Check-in
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  id="hero-checkin-btn"
                  type="button"
                  className={cn(
                    'flex min-h-[44px] w-full items-center justify-between rounded-[2px] border border-line bg-cream px-3.5 py-2 text-sm text-charcoal hover:border-charcoal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer'
                  )}
                >
                  <span className="tabular-nums">
                    {range?.from ? format(range.from, 'dd MMM yyyy') : 'Select date'}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={(nextRange) => {
                    setRange(nextRange);
                    setError(null);
                    if (nextRange?.from && nextRange?.to && nextRange.to > nextRange.from) {
                      setCalendarOpen(false);
                    }
                  }}
                  disabled={{ before: today }}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out */}
          <div className="md:col-span-3">
            <label
              htmlFor="hero-checkout-btn"
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-muted mb-1.5"
            >
              Check-out
            </label>
            <button
              id="hero-checkout-btn"
              type="button"
              onClick={() => setCalendarOpen(true)}
              className="flex min-h-[44px] w-full items-center justify-between rounded-[2px] border border-line bg-cream px-3.5 py-2 text-sm text-charcoal hover:border-charcoal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
            >
              <span className="tabular-nums">
                {range?.to ? format(range.to, 'dd MMM yyyy') : 'Select date'}
              </span>
              <CalendarIcon className="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          {/* Guests stepper */}
          <div className="md:col-span-3">
            <label
              htmlFor="hero-guests-btn"
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-muted mb-1.5"
            >
              Guests
            </label>
            <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
              <PopoverTrigger asChild>
                <button
                  id="hero-guests-btn"
                  type="button"
                  className="flex min-h-[44px] w-full items-center justify-between rounded-[2px] border border-line bg-cream px-3.5 py-2 text-sm text-charcoal hover:border-charcoal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                >
                  <span className="tabular-nums">
                    {adults} {adults === 1 ? 'Adult' : 'Adults'}
                    {children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
                  </span>
                  <Users className="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 space-y-4" align="start">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">Adults</p>
                    <p className="text-xs text-muted">Ages 13 and above</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease adults"
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-line hover:bg-sand cursor-pointer"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                    <span className="w-6 text-center text-sm tabular-nums">{adults}</span>
                    <button
                      type="button"
                      aria-label="Increase adults"
                      onClick={() => setAdults((a) => Math.min(4, a + 1))}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-line hover:bg-sand cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-line">
                  <div>
                    <p className="text-sm font-medium text-charcoal">Children</p>
                    <p className="text-xs text-muted">Ages 0 to 12</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease children"
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-line hover:bg-sand cursor-pointer"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                    <span className="w-6 text-center text-sm tabular-nums">{children}</span>
                    <button
                      type="button"
                      aria-label="Increase children"
                      onClick={() => setChildren((c) => Math.min(3, c + 1))}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-line hover:bg-sand cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Primary Action */}
          <div className="md:col-span-3">
            <Button type="submit" variant="gold" className="w-full">
              Check availability
            </Button>
          </div>
        </div>

        <div aria-live="polite" className="min-h-0">
          {error && (
            <p className="mt-3 text-sm text-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
