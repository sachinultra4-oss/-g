import * as React from 'react';
import { galleryPhotos, type GalleryPhoto } from '@/src/data/hotel';
import { SeoHead } from '@/src/components/layout/SeoHead';
import { Lightbox } from '@/src/components/ui/lightbox';
import { ParallaxMedia, RevealBlock } from '@/src/components/ui/motion-primitives';
import { cn } from '@/src/lib/utils';

type GalleryFilter = 'All' | GalleryPhoto['category'];
const FILTERS: GalleryFilter[] = ['All', 'Rooms', 'Dining', 'Pool & Spa', 'Events'];

export default function GalleryPage() {
  const [filter, setFilter] = React.useState<GalleryFilter>('All');
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const visiblePhotos = React.useMemo(() => {
    if (filter === 'All') return galleryPhotos;
    return galleryPhotos.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <>
      <SeoHead
        title="Gallery & Experiences"
        description="Photographs of Grand Palace Hotel: sunlit suites, limestone colonnades, The Veranda dining room, and the stone spa sanctuary."
        path="/gallery"
      />

      <section className="bg-sand pt-28 pb-12 border-b border-line">
        <div className="site-container space-y-6">
          <RevealBlock className="space-y-3 max-w-2xl">
            <p className="eyebrow">Photographs</p>
            <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-navy">
              Gallery &amp; Experiences
            </h1>
            <p className="text-base text-muted leading-relaxed">
              Four acres of sandstone courtyards, suites, and dining rooms across the seasons. Select any photograph to view full size.
            </p>
          </RevealBlock>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
            {FILTERS.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(cat);
                    setLightboxIndex(null);
                  }}
                  className={cn(
                    'min-h-[44px] rounded-[999px] px-5 text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0',
                    active
                      ? 'bg-navy text-cream'
                      : 'bg-cream text-charcoal border border-line hover:border-navy/40'
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="site-container">
          {/* Masonry Grid — no captions printed under photos */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {visiblePhotos.map((item, idx) => (
              <div key={item.id} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Open ${item.title} in lightbox`}
                  className="group block w-full overflow-hidden rounded-[6px] bg-sand cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <ParallaxMedia range={20} className="w-full">
                    <img
                      src={item.asset.src}
                      alt={item.asset.alt}
                      width={item.asset.width}
                      height={item.asset.height}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </ParallaxMedia>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={visiblePhotos.map((item) => ({
          asset: item.asset,
          title: item.title,
        }))}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </>
  );
}
