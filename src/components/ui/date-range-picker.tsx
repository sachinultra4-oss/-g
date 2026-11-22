import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/src/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  disabledDates?: Date[];
  minDate?: Date;
  placeholder?: string;
  className?: string;
  hasError?: boolean;
  id?: string;
}

export function DateRangePicker({
  value,
  onChange,
  disabledDates = [],
  minDate = new Date(),
  placeholder = 'Select check-in and check-out',
  className,
  hasError,
  id,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const label = React.useMemo(() => {
    if (value?.from && value?.to) {
      return `${format(value.from, 'dd MMM yyyy')} — ${format(value.to, 'dd MMM yyyy')}`;
    }
    if (value?.from) {
      return `${format(value.from, 'dd MMM yyyy')} — Select check-out`;
    }
    return placeholder;
  }, [value, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            'flex min-h-[44px] w-full items-center justify-between rounded-[2px] border bg-cream px-3.5 py-2.5 text-left text-sm text-charcoal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer',
            hasError ? 'border-error' : 'border-line hover:border-charcoal/35',
            !value?.from && 'text-muted',
            className
          )}
        >
          <span className="truncate tabular-nums">{label}</span>
          <CalendarIcon className="ml-2 h-4 w-4 shrink-0 text-muted" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={(range) => {
            onChange(range);
            if (range?.from && range?.to && range.to > range.from) {
              setOpen(false);
            }
          }}
          disabled={[{ before: minDate }, ...disabledDates]}
          numberOfMonths={1}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
