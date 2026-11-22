import { Link } from 'react-router-dom';
import { media } from '@/src/data/media';
import { diningHours } from '@/src/data/dining';
import { HotelImage } from '@/src/components/ui/hotel-image';
import { ParallaxMedia, RevealBlock } from '@/src/components/ui/motion-primitives';
import { Button } from '@/src/components/ui/button';

export function DiningPreviewSection() {
  return (
    <section className="section-pad bg-sand">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Text */}
          <div className="lg:col-span-5 space-y-6">
            <RevealBlock className="space-y-4">
              <p className="eyebrow">Dining</p>
              <h2 className="font-serif text-[2.25rem] md:text-[3rem] text-navy">
                The Veranda Dining Room
              </h2>
              <p className="text-base text-charcoal/90 leading-relaxed">
                Opening directly onto the lantern-lit west courtyard, our kitchen works with coastal fish, heirloom grains, and produce from our own kitchen garden.
              </p>
            </RevealBlock>

            <dl className="border-t border-line divide-y divide-line text-sm">
              {diningHours.map((slot) => (
                <div
                  key={slot.service}
                  className="py-3 flex items-baseline justify-between gap-4"
                >
                  <dt className="font-medium text-charcoal">{slot.service}</dt>
                  <dd className="text-muted tabular-nums shrink-0">{slot.hours}</dd>
                </div>
              ))}
            </dl>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild variant="primary">
                <Link to="/reserve">Reserve a table</Link>
              </Button>
              <Button asChild variant="link">
                <Link to="/dining">Explore seasonal menu</Link>
              </Button>
            </div>
          </div>

          {/* Offset Two-Photo Composition */}
          <div className="lg:col-span-7 relative pb-10 sm:pb-16">
            <RevealBlock>
              <ParallaxMedia range={28} className="rounded-[6px] w-[88%] shadow-[var(--shadow-2)]">
                <HotelImage
                  asset={media.diningHall}
                  aspectClass="aspect-[4/3]"
                  sizes="(max-width: 1024px) 90vw, 48vw"
                />
              </ParallaxMedia>
            </RevealBlock>
            <div className="w-[52%] ml-auto -mt-20 sm:-mt-32 relative z-10 rounded-[6px] border-4 border-sand bg-sand shadow-[var(--shadow-3)] overflow-hidden">
              <HotelImage
                asset={media.diningPlate}
                aspectClass="aspect-[4/3]"
                sizes="(max-width: 1024px) 50vw, 28vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
