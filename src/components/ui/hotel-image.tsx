import * as React from 'react';
import { BedDouble } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import type { MediaAsset } from '@/src/data/media';

interface HotelImageProps {
  asset: MediaAsset;
  className?: string;
  imgClassName?: string;
  aspectClass?: string;
  eager?: boolean;
  priority?: 'high' | 'low' | 'auto';
  sizes?: string;
}

export function HotelImage({
  asset,
  className,
  imgClassName,
  aspectClass = 'aspect-[4/3]',
  eager = false,
  priority = 'auto',
  sizes = '(max-width: 768px) 100vw, 50vw',
}: HotelImageProps) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-sand',
        aspectClass,
        className
      )}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sand to-cream p-6 text-center text-muted">
          <BedDouble className="mb-2 h-6 w-6 text-gold-ink" strokeWidth={1.5} aria-hidden="true" />
          <span className="font-serif text-base text-charcoal">{asset.alt}</span>
        </div>
      ) : (
        <img
          src={asset.src}
          srcSet={`${asset.src} 1x`}
          sizes={sizes}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={priority}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={cn(
            'h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            imgClassName
          )}
        />
      )}
    </div>
  );
}
