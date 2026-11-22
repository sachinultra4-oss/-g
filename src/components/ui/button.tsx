import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 text-sm font-medium transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:translate-y-px cursor-pointer min-h-[44px]',
  {
    variants: {
      variant: {
        primary:
          'bg-navy text-cream rounded-[2px] hover:bg-navy/90 hover:-translate-y-px shadow-[var(--shadow-1)]',
        gold:
          'bg-gold text-navy rounded-[2px] hover:bg-[#b8923f] hover:-translate-y-px shadow-[var(--shadow-1)]',
        forest:
          'bg-forest text-cream rounded-[2px] hover:bg-forest/90 hover:-translate-y-px shadow-[var(--shadow-1)]',
        outline:
          'border border-navy/25 bg-transparent text-navy rounded-[2px] hover:border-navy hover:bg-sand/50',
        'outline-light':
          'border border-cream/35 bg-transparent text-cream rounded-[2px] hover:border-cream hover:bg-cream/10',
        ghost:
          'bg-transparent text-charcoal rounded-[2px] hover:bg-sand/70',
        link:
          'bg-transparent text-navy p-0 min-h-[44px] h-auto draw-underline hover:text-gold-ink',
        'link-light':
          'bg-transparent text-cream p-0 min-h-[44px] h-auto draw-underline hover:text-gold',
      },
      size: {
        sm: 'h-11 px-4 text-xs tracking-wide',
        md: 'h-11 px-6 py-2.5 text-sm',
        lg: 'h-12 px-8 py-3 text-sm tracking-wide',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
