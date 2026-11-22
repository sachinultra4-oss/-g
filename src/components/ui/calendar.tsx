import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('gp-calendar p-2 select-none', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-6',
        month: 'space-y-3',
        month_caption: 'flex justify-center pt-1 relative items-center h-9',
        caption_label: 'font-serif text-lg font-semibold text-navy',
        nav: 'flex items-center justify-between absolute inset-x-0 top-1 px-1',
        button_previous:
          'inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-line bg-cream text-charcoal hover:bg-sand transition-colors cursor-pointer disabled:opacity-40',
        button_next:
          'inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-line bg-cream text-charcoal hover:bg-sand transition-colors cursor-pointer disabled:opacity-40',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'text-muted w-10 font-normal text-xs uppercase tracking-wider text-center py-1',
        week: 'flex w-full mt-1',
        day: 'h-10 w-10 p-0 text-center text-sm relative',
        day_button:
          'h-10 w-10 rounded-[2px] font-normal text-charcoal transition-colors duration-150 hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer flex items-center justify-center tabular-nums',
        selected:
          'bg-navy text-cream hover:bg-navy hover:text-cream rounded-[2px]',
        range_start:
          'bg-navy text-cream rounded-l-[2px] rounded-r-none hover:bg-navy hover:text-cream',
        range_middle:
          'bg-sand text-navy rounded-none hover:bg-sand/80',
        range_end:
          'bg-navy text-cream rounded-r-[2px] rounded-l-none hover:bg-navy hover:text-cream',
        today: 'border border-gold/70 font-medium',
        outside: 'text-muted/45 opacity-60',
        disabled: 'text-muted/35 line-through cursor-not-allowed hover:bg-transparent',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
