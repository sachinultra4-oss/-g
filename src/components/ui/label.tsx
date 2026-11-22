import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  requiredMark?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, requiredMark, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block text-xs font-medium uppercase tracking-[0.14em] text-muted mb-1.5',
        className
      )}
      {...props}
    >
      {children}
      {requiredMark && (
        <span className="ml-1 text-error" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
);
Label.displayName = 'Label';

export { Label };
