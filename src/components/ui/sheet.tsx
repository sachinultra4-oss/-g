import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-navy/50 transition-opacity duration-300', className)}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: 'left' | 'right';
  }
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 flex flex-col bg-cream text-charcoal shadow-[var(--shadow-3)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] inset-y-0 w-full max-w-sm border-line p-6',
        side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        aria-label="Close navigation menu"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-[2px] text-charcoal transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1 text-left pb-4 border-b border-line', className)} {...props} />
);

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-serif text-2xl font-semibold text-navy', className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle };
