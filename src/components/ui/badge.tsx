import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center whitespace-nowrap shrink-0 rounded-[999px] px-3 py-1 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-sand text-charcoal border border-line',
        navy: 'bg-navy text-cream',
        gold: 'bg-gold/20 text-gold-ink border border-gold/40',
        success: 'bg-success-bg text-success border border-success/25',
        error: 'bg-error-bg text-error border border-error/25',
        warning: 'bg-warning-bg text-warning border border-warning/25',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
