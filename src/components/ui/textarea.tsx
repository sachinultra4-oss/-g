import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[112px] w-full rounded-[2px] border bg-cream px-3.5 py-2.5 text-base text-charcoal transition-colors duration-150 placeholder:text-muted/70 focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/35 disabled:cursor-not-allowed disabled:opacity-50',
          hasError
            ? 'border-error focus-visible:border-error focus-visible:ring-error/25'
            : 'border-line hover:border-charcoal/35',
          className
        )}
        ref={ref}
        aria-invalid={hasError ? 'true' : undefined}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
