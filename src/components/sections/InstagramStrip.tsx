import { ArrowUpRight } from 'lucide-react';
import { homeInstagramStrip } from '@/src/data/hotel';
import { siteConfig } from '@/src/config/site';
import { HotelImage } from '@/src/components/ui/hotel-image';
import { RevealBlock } from '@/src/components/ui/motion-primitives';

export function InstagramStrip() {
  return (
    <section className="section-pad bg-cream">
      <div className="site-container space-y-8">
        <RevealBlock className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="eyebrow">Journal</p>
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] text-navy">
              Around the grounds
            </h2>
          </div>
          <a
            href={siteConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="draw-underline inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold-ink py-2"
          >
            <span>{siteConfig.social.instagramHandle}</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </RevealBlock>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeInstagramStrip.map((asset) => (
            <a
              key={asset.id}
              href={siteConfig.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${asset.alt} on Instagram`}
              className="group block overflow-hidden rounded-[6px]"
            >
              <HotelImage
                asset={asset}
                aspectClass="aspect-square"
                imgClassName="group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
