import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { rooms } from '@/src/data/rooms';
import { formatCompactINR } from '@/src/lib/utils';
import { HotelImage } from '@/src/components/ui/hotel-image';
import { RevealBlock } from '@/src/components/ui/motion-primitives';
import { Button } from '@/src/components/ui/button';

export function FeaturedRoomsSection() {
  const featured = rooms.filter((r) => r.featured).slice(0, 3);
  const [leadRoom, ...secondaryRooms] = featured;

  if (!leadRoom) return null;

  return (
    <section className="section-pad bg-cream">
      <div className="site-container space-y-12">
        <RevealBlock className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-6">
          <div className="space-y-2 max-w-2xl">
            <p className="eyebrow">Residences</p>
            <h2 className="font-serif text-[2.25rem] md:text-[3rem] text-navy">
              Rooms &amp; Suites
            </h2>
          </div>
          <Button asChild variant="link">
            <Link to="/rooms">
              View all 8 room types
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </Button>
        </RevealBlock>

        {/* Lead Suite Spotlight (Split Horizontal Composition) */}
        <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-[6px] border border-line bg-cream overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-2)]">
          <Link
            to={`/rooms/${leadRoom.slug}`}
            className="lg:col-span-7 block overflow-hidden"
          >
            <HotelImage
              asset={leadRoom.images[0]}
              aspectClass="aspect-[4/3] lg:aspect-auto lg:h-full"
              imgClassName="group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </Link>
          <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-10 space-y-6">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-ink font-medium">
                {leadRoom.category} · {leadRoom.sizeSqM} sq m · {leadRoom.bedType}
              </p>
              <h3 className="font-serif text-3xl text-navy">
                <Link to={`/rooms/${leadRoom.slug}`} className="hover:text-gold-ink transition-colors">
                  {leadRoom.name}
                </Link>
              </h3>
              <p className="text-base text-muted leading-relaxed">
                {leadRoom.description}
              </p>
            </div>

            <div className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="block text-xs uppercase tracking-[0.14em] text-muted">
                  Nightly tariff
                </span>
                <span className="font-serif text-2xl font-semibold text-navy tabular-nums">
                  From {formatCompactINR(leadRoom.ratePerNight)}
                </span>
              </div>
              <Button asChild variant="primary">
                <Link to={`/rooms/${leadRoom.slug}`}>Inspect suite</Link>
              </Button>
            </div>
          </div>
        </article>

        {/* Two Secondary Rooms Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryRooms.map((room) => (
            <article
              key={room.id}
              className="group flex flex-col rounded-[6px] border border-line bg-cream overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-2)]"
            >
              <Link to={`/rooms/${room.slug}`} className="block overflow-hidden">
                <HotelImage
                  asset={room.images[0]}
                  aspectClass="aspect-[4/3]"
                  imgClassName="group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between p-6 md:p-8 space-y-5">
                <div className="space-y-2.5">
                  <p className="text-xs text-muted tabular-nums">
                    {room.sizeSqM} sq m <span aria-hidden="true">·</span> {room.bedType}{' '}
                    <span aria-hidden="true">·</span> Up to {room.maxGuests} guests
                  </p>
                  <h3 className="font-serif text-2xl text-navy">
                    <Link to={`/rooms/${room.slug}`} className="hover:text-gold-ink transition-colors">
                      {room.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {room.shortTagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-navy tabular-nums">
                    From {formatCompactINR(room.ratePerNight)} / night
                  </span>
                  <Button asChild variant="link">
                    <Link to={`/rooms/${room.slug}`}>View details</Link>
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
