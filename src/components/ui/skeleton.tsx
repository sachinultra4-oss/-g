import * as React from 'react';
import { cn } from '@/src/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[6px] bg-sand/90',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
