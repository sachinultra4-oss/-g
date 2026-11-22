import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BedDouble, Check, RotateCcw } from 'lucide-react';
import { rooms, type RoomCategory } from '@/src/data/rooms';
import { formatCompactINR } from '@/src/lib/utils';
import { SeoHead } from '@/src/components/layout/SeoHead';
import { HotelImage } from '@/src/components/ui/hotel-image';
import { Button } from '@/src/components/ui/button';
import { Slider } from '@/src/components/ui/slider';
import { Skeleton } from '@/src/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { RevealBlock } from '@/src/components/ui/motion-primitives';
import { cn } from '@/src/lib/utils';

const CATEGORIES: Array<'All' | RoomCategory> = [
  'All',
  'Deluxe',
  'Premier',
  'Suite',
  'Family',
];

const MIN_RATE = 12000;
const MAX_RATE = 40000;

export default function RoomsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = (searchParams.get('category') as 'All' | RoomCategory) || 'All';
  const initialAdults = Number(searchParams.get('adults') || '0');
  const initialChildren = Number(searchParams.get('children') || '0');
  const initialGuests = initialAdults + initialChildren;
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');

  const [category, setCategory] = React.useState<'All' | RoomCategory>(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  );
  const [priceCap, setPriceCap] = React.useState<number>(MAX_RATE);
  const [minGuests, setMinGuests] = React.useState<number>(
    initialGuests > 0 ? Math.min(initialGuests, 4) : 0
  );
  const [isFiltering, setIsFiltering] = React.useState(false);

  const triggerFilterTransition = () => {
    setIsFiltering(true);
    window.setTimeout(() => setIsFiltering(false), 180);
  };

  const filteredRooms = React.useMemo(() => {
    return rooms.filter((room) => {
      if (category !== 'All' && room.category !== category) return false;
      if (room.ratePerNight > priceCap) return false;
      if (minGuests > 0 && room.maxGuests < minGuests) return false;
      return true;
    });
  }, [category, priceCap, minGuests]);

  const handleReset = () => {
    setCategory('All');
    setPriceCap(MAX_RATE);
    setMinGuests(0);
    setSearchParams({});
    triggerFilterTransition();
  };

  const buildDetailUrl = (slug: string) => {
    const next = new URLSearchParams();
    if (checkInParam) next.set('checkIn', checkInParam);
    if (checkOutParam) next.set('checkOut', checkOutParam);
    if (initialAdults > 0) next.set('adults', String(initialAdults));
    if (initialChildren > 0) next.set('children', String(initialChildren));
    const qs = next.toString();
    return qs ? `/rooms/${slug}?${qs}` : `/rooms/${slug}`;
  };

  return (
    <>
      <SeoHead
        title="Rooms & Suites"
        description="Browse 8 room and suite types at Grand Palace Hotel, from quiet courtyard king rooms to private rooftop terrace suites."
        path="/rooms"
        schemaType="Hotel"
      />

      <section className="bg-sand pt-28 pb-14 border-b border-line">
        <div className="site-container space-y-4">
          <RevealBlock className="space-y-3 max-w-2xl">
            <p className="eyebrow">Accommodations</p>
            <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-navy">
              Rooms &amp; Suites
            </h1>
            <p className="text-base text-muted leading-relaxed">
              Twenty-eight sunlit rooms across three limestone wings. Select your preferred wing, guest capacity, or nightly rate below.
            </p>
          </RevealBlock>

          {checkInParam && checkOutParam && (
            <p className="text-sm text-navy pt-1 tabular-nums">
              Showing rooms for{' '}
              <strong>
                {checkInParam} to {checkOutParam}
              </strong>
              {initialGuests > 0 ? ` · ${initialGuests} guests` : ''}
            </p>
          )}
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="site-container space-y-10">
          {/* Filter Bar */}
          <div className="rounded-[6px] border border-line bg-cream p-5 md:p-6 shadow-[var(--shadow-1)] space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              {/* Room Type Chips */}
              <div className="lg:col-span-5 space-y-2">
                <span className="block text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Room type
                </span>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by room type">
                  {CATEGORIES.map((cat) => {
                    const active = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setCategory(cat);
                          triggerFilterTransition();
                        }}
                        className={cn(
                          'min-h-[40px] rounded-[999px] px-4 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0',
                          active
                            ? 'bg-navy text-cream'
                            : 'bg-sand text-charcoal hover:bg-sand/75 border border-line'
                        )}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="lg:col-span-4 space-y-1">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-muted">
                  <label htmlFor="price-slider">Max nightly rate</label>
                  <span className="font-medium text-navy tabular-nums">
                    {formatCompactINR(priceCap)}
                  </span>
                </div>
                <Slider
                  id="price-slider"
                  min={MIN_RATE}
                  max={MAX_RATE}
                  step={500}
                  value={[priceCap]}
                  onValueChange={([val]) => setPriceCap(val)}
                  aria-label="Maximum nightly rate in INR"
                />
              </div>

              {/* Guest Capacity */}
              <div className="lg:col-span-3 space-y-1.5">
                <label
                  htmlFor="guests-filter"
                  className="block text-xs font-medium uppercase tracking-[0.14em] text-muted"
                >
                  Guests
                </label>
                <Select
                  value={String(minGuests)}
                  onValueChange={(val) => {
                    setMinGuests(Number(val));
                    triggerFilterTransition();
                  }}
                >
                  <SelectTrigger id="guests-filter">
                    <SelectValue placeholder="Any capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any guest count</SelectItem>
                    <SelectItem value="2">2 or more guests</SelectItem>
                    <SelectItem value="3">3 or more guests</SelectItem>
                    <SelectItem value="4">4 guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4 text-sm">
              <p className="text-muted tabular-nums" aria-live="polite">
                Showing <strong className="text-navy">{filteredRooms.length}</strong> of{' '}
                {rooms.length} room types
              </p>
              {(category !== 'All' || priceCap < MAX_RATE || minGuests > 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold-ink cursor-pointer min-h-[40px]"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Room Grid */}
          {isFiltering ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-[6px] border border-line bg-cream overflow-hidden p-0 space-y-4"
                >
                  <Skeleton className="aspect-[4/3] w-full rounded-none" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="rounded-[6px] border border-line bg-sand/40 p-12 text-center space-y-4">
              <BedDouble className="mx-auto h-8 w-8 text-gold-ink" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="font-serif text-2xl text-navy">
                No rooms match those filters
              </h2>
              <p className="text-sm text-muted max-w-md mx-auto">
                Try raising your nightly rate ceiling or clearing the guest capacity filter to view all eight room categories.
              </p>
              <div className="pt-2">
                <Button variant="primary" onClick={handleReset}>
                  Show all rooms
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <article
                  key={room.id}
                  className="group flex flex-col rounded-[6px] border border-line bg-cream overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-2)]"
                >
                  <Link to={buildDetailUrl(room.slug)} className="block overflow-hidden">
                    <HotelImage
                      asset={room.images[0]}
                      aspectClass="aspect-[4/3]"
                      imgClassName="group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between p-6 space-y-5">
                    <div className="space-y-3">
                      <p className="text-xs text-muted tabular-nums">
                        {room.sizeSqM} sq m <span aria-hidden="true">·</span> {room.bedType}{' '}
                        <span aria-hidden="true">·</span> Max {room.maxGuests} guests
                      </p>
                      <h2 className="font-serif text-2xl text-navy">
                        <Link
                          to={buildDetailUrl(room.slug)}
                          className="hover:text-gold-ink transition-colors"
                        >
                          {room.name}
                        </Link>
                      </h2>
                      <p className="text-sm text-muted leading-relaxed">
                        {room.shortTagline}
                      </p>

                      <ul className="pt-2 space-y-1.5 text-xs text-charcoal/85">
                        {room.amenities.slice(0, 3).map((amenity) => (
                          <li key={amenity} className="flex items-center gap-2">
                            <Check
                              className="h-3.5 w-3.5 text-gold-ink shrink-0"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-line flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                          From
                        </span>
                        <span className="font-medium text-navy tabular-nums">
                          {formatCompactINR(room.ratePerNight)} / night
                        </span>
                      </div>
                      <Button asChild variant="primary" size="sm">
                        <Link to={buildDetailUrl(room.slug)}>Book now</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
