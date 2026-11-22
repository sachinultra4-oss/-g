import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { offerPackages } from '@/src/data/hotel';
import { HotelImage } from '@/src/components/ui/hotel-image';
import { RevealBlock } from '@/src/components/ui/motion-primitives';
import { Button } from '@/src/components/ui/button';

export function OffersSection() {
  return (
    <section className="section-pad bg-cream">
      <div className="site-container space-y-12">
        <RevealBlock className="max-w-2xl space-y-2">
          <p className="eyebrow">Seasonal Stays</p>
          <h2 className="font-serif text-[2.25rem] md:text-[3rem] text-navy">
            House Packages
          </h2>
        </RevealBlock>

        <div className="space-y-10">
          {offerPackages.map((offer, index) => (
            <article
              key={offer.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-t border-line pt-10"
            >
              <div
                className={
                  index % 2 === 1
                    ? 'lg:col-span-6 lg:order-2'
                    : 'lg:col-span-6'
                }
              >
                <HotelImage
                  asset={offer.image}
                  aspectClass="aspect-[4/3]"
                  className="rounded-[6px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div
                className={
                  index % 2 === 1
                    ? 'lg:col-span-6 lg:order-1 flex flex-col justify-center space-y-5 lg:pr-8'
                    : 'lg:col-span-6 flex flex-col justify-center space-y-5 lg:pl-8'
                }
              >
                <p className="text-xs uppercase tracking-[0.16em] text-gold-ink font-medium">
                  {offer.duration}
                </p>
                <h3 className="font-serif text-3xl text-navy">{offer.title}</h3>
                <p className="text-base text-muted leading-relaxed">{offer.summary}</p>
                <ul className="space-y-1.5 text-sm text-charcoal border-l border-gold pl-4">
                  {offer.includes.map((inc) => (
                    <li key={inc}>{inc}</li>
                  ))}
                </ul>
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-serif text-xl font-semibold text-navy tabular-nums">
                    {offer.startingPrice}
                  </span>
                  <Button asChild variant="outline">
                    <Link to={offer.ctaTo}>
                      {offer.ctaLabel}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
