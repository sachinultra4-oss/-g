import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/src/data/hotel';
import { RevealBlock } from '@/src/components/ui/motion-primitives';
import { cn } from '@/src/lib/utils';

export function TestimonialsSection() {
  const [index, setIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const current = testimonials[index];

  return (
    <section
      aria-label="Guest notes"
      className="section-pad bg-sand"
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(delta) > 48) {
          if (delta < 0) next();
          else prev();
        }
        touchStartX.current = null;
      }}
    >
      <div className="site-container max-w-4xl">
        <RevealBlock className="space-y-2 mb-10 text-center">
          <p className="eyebrow">Guest Book</p>
          <h2 className="font-serif text-[2.25rem] md:text-[2.75rem] text-navy">
            Notes from recent stays
          </h2>
        </RevealBlock>

        <div className="space-y-8 text-center">
          <blockquote className="font-serif text-2xl sm:text-3xl leading-[1.35] text-charcoal italic text-balance">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div className="space-y-1">
            <p className="text-sm font-medium text-navy">{current.author}</p>
            <p className="text-xs text-muted">
              {current.origin} <span aria-hidden="true">·</span> {current.stayDetail}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous guest note"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-line bg-cream text-navy hover:bg-navy hover:text-cream transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Select guest note">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === index}
                  aria-label={`Guest note ${idx + 1}`}
                  onClick={() => setIndex(idx)}
                  className="inline-flex h-11 w-6 items-center justify-center cursor-pointer"
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-all duration-200',
                      idx === index ? 'w-6 bg-navy' : 'w-2 bg-charcoal/25'
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next guest note"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-line bg-cream text-navy hover:bg-navy hover:text-cream transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
