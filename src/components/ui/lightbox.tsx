import * as React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MediaAsset } from '@/src/data/media';

interface LightboxProps {
  images: Array<{ asset: MediaAsset; title?: string }>;
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (next: number) => void;
}

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxProps) {
  const touchStartX = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + images.length) % images.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, images.length, onChangeIndex, onClose]);

  if (activeIndex === null || !images[activeIndex]) return null;

  const current = images[activeIndex];
  const goNext = () => onChangeIndex((activeIndex + 1) % images.length);
  const goPrev = () => onChangeIndex((activeIndex - 1 + images.length) % images.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title ?? current.asset.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/92 p-4 md:p-8"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(delta) > 48) {
          if (delta < 0) goNext();
          else goPrev();
        }
        touchStartX.current = null;
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-cream/25 bg-navy/70 text-cream transition-colors hover:bg-cream hover:text-navy cursor-pointer"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photograph"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-cream/25 bg-navy/75 text-cream transition-colors hover:bg-cream hover:text-navy cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next photograph"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-cream/25 bg-navy/75 text-cream transition-colors hover:bg-cream hover:text-navy cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </>
      )}

      <div
        className="relative max-h-[84vh] max-w-5xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.asset.src}
          alt={current.asset.alt}
          width={current.asset.width}
          height={current.asset.height}
          referrerPolicy="no-referrer"
          className="max-h-[76vh] w-auto max-w-full rounded-[4px] object-contain shadow-[var(--shadow-3)]"
        />
        <div className="mt-3 flex items-center justify-between gap-4 text-xs text-cream/80 tabular-nums">
          <span>{current.title ?? current.asset.alt}</span>
          <span>
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
