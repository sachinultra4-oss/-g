import * as React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { addDays, differenceInCalendarDays, parseISO, startOfToday } from 'date-fns';
import { ArrowLeft, Check, Maximize2 } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { getBlockedDatesForRoom, getRoomBySlug } from '@/src/data/rooms';
import { siteConfig } from '@/src/config/site';
import { formatCompactINR, formatINR } from '@/src/lib/utils';
import { SeoHead } from '@/src/components/layout/SeoHead';
import { HotelImage } from '@/src/components/ui/hotel-image';
import { Button } from '@/src/components/ui/button';
import { Calendar } from '@/src/components/ui/calendar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import { Lightbox } from '@/src/components/ui/lightbox';
import { RoomBookingDialog } from '@/src/components/booking/RoomBookingDialog';

export default function RoomDetailPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const room = getRoomBySlug(slug);

  const today = startOfToday();
  const initialRange: DateRange = React.useMemo(() => {
    const ci = searchParams.get('checkIn');
    const co = searchParams.get('checkOut');
    if (ci && co) {
      const from = parseISO(ci);
      const to = parseISO(co);
      if (!Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime()) && to > from) {
        return { from, to };
      }
    }
    return {
      from: addDays(today, 3),
      to: addDays(today, 5),
    };
  }, [searchParams, today]);

  const [range, setRange] = React.useState<DateRange | undefined>(initialRange);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = React.useState(false);

  if (!room) {
    return (
      <section className="pt-36 pb-24 bg-cream">
        <div className="site-container max-w-xl text-center space-y-5">
          <p className="eyebrow">Room unavailable</p>
          <h1 className="font-serif text-4xl text-navy">
            We could not find that room
          </h1>
          <p className="text-muted">
            Return to our full collection of eight rooms and suites to check availability.
          </p>
          <Button asChild variant="primary">
            <Link to="/rooms">Browse all rooms</Link>
          </Button>
        </div>
      </section>
    );
  }

  const blockedDates = getBlockedDatesForRoom(room);
  const nights =
    range?.from && range?.to
      ? Math.max(0, differenceInCalendarDays(range.to, range.from))
      : 0;
  const subtotal = nights * room.ratePerNight;
  const tax = Math.round(subtotal * siteConfig.taxRate);
  const total = subtotal + tax;

  const initialAdults = Number(searchParams.get('adults') || '2');
  const initialChildren = Number(searchParams.get('children') || '0');

  return (
    <>
      <SeoHead
        title={room.name}
        description={room.description}
        path={`/rooms/${room.slug}`}
        image={room.images[0].src}
      />

      <section className="bg-cream pt-28 pb-16">
        <div className="site-container space-y-8">
          <div>
            <Button asChild variant="link" className="text-muted hover:text-navy">
              <Link to="/rooms">
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                All rooms &amp; suites
              </Link>
            </Button>
          </div>

          {/* Room Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-line pb-8">
            <div className="lg:col-span-8 space-y-3">
              <p className="eyebrow">
                {room.category} <span aria-hidden="true">·</span> {room.view}
              </p>
              <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-navy">
                {room.name}
              </h1>
              <p className="text-sm text-muted tabular-nums">
                {room.sizeSqM} sq m <span aria-hidden="true">·</span> {room.bedType}{' '}
                <span aria-hidden="true">·</span> {room.floor}{' '}
                <span aria-hidden="true">·</span> Up to {room.maxGuests} guests
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <span className="block text-xs uppercase tracking-[0.14em] text-muted">
                Nightly rate
              </span>
              <span className="font-serif text-3xl font-semibold text-navy tabular-nums">
                {formatCompactINR(room.ratePerNight)}
              </span>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              aria-label={`Open gallery for ${room.name}`}
              className="md:col-span-8 group relative block overflow-hidden rounded-[6px] cursor-pointer text-left"
            >
              <HotelImage
                asset={room.images[0]}
                aspectClass="aspect-[4/3]"
                imgClassName="group-hover:scale-[1.02]"
                eager
                priority="high"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-[2px] bg-navy/80 px-3 py-1.5 text-xs text-cream">
                <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                View gallery ({room.images.length})
              </span>
            </button>

            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
              {room.images.slice(1, 3).map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx + 1)}
                  aria-label={`Open photo ${idx + 2} of ${room.name}`}
                  className="group block overflow-hidden rounded-[6px] cursor-pointer"
                >
                  <HotelImage
                    asset={img}
                    aspectClass="aspect-[4/3]"
                    imgClassName="group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details + Live Availability & Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
            {/* Left: Description, Amenities, Policies */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl text-navy">
                  About this residence
                </h2>
                <p className="text-base text-charcoal/90 leading-relaxed">
                  {room.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-line">
                <h2 className="font-serif text-2xl text-navy">Room amenities</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-charcoal">
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-2.5">
                      <Check
                        className="h-4 w-4 text-gold-ink shrink-0 mt-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-line">
                <h2 className="font-serif text-2xl text-navy">House policies</h2>
                <Accordion type="single" collapsible defaultValue="checkin">
                  <AccordionItem value="checkin">
                    <AccordionTrigger>Check-in &amp; Check-out</AccordionTrigger>
                    <AccordionContent>
                      Check-in is welcomed {room.policies.checkIn}; check-out is{' '}
                      {room.policies.checkOut}. Complimentary luggage storage is available at our 24-hour front desk.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cancellation">
                    <AccordionTrigger>Cancellation &amp; Modifications</AccordionTrigger>
                    <AccordionContent>{room.policies.cancellation}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="children">
                    <AccordionTrigger>Children &amp; Extra Guests</AccordionTrigger>
                    <AccordionContent>{room.policies.children}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Right: Availability Calendar + Live Price Calculator */}
            <aside className="lg:col-span-5">
              <div className="sticky top-24 rounded-[6px] border border-line bg-sand/55 p-6 space-y-6 shadow-[var(--shadow-1)]">
                <div className="space-y-1">
                  <p className="eyebrow">Availability &amp; Estimate</p>
                  <h2 className="font-serif text-2xl text-navy">
                    Select your dates
                  </h2>
                  <p className="text-xs text-muted">
                    Crossed-out dates are currently reserved.
                  </p>
                </div>

                <div className="rounded-[6px] border border-line bg-cream p-2 flex justify-center overflow-x-auto">
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    disabled={[{ before: today }, ...blockedDates]}
                    numberOfMonths={1}
                  />
                </div>

                {/* Live Price Breakdown */}
                <div className="space-y-2.5 pt-2 border-t border-line text-sm">
                  {nights > 0 ? (
                    <>
                      <div className="flex justify-between text-charcoal">
                        <span className="tabular-nums">
                          {nights} {nights === 1 ? 'night' : 'nights'} &times;{' '}
                          {formatINR(room.ratePerNight)}
                        </span>
                        <span className="tabular-nums">{formatINR(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>Hotel taxes &amp; GST (12%)</span>
                        <span className="tabular-nums">{formatINR(tax)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-line font-semibold text-base text-navy">
                        <span>Estimated total</span>
                        <span className="tabular-nums">{formatINR(total)}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted text-sm">
                      Choose a check-in and check-out date on the calendar to calculate your stay estimate.
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setBookingOpen(true)}
                >
                  Book now
                </Button>

                <p className="text-xs text-muted text-center">
                  No immediate payment is collected. Requests are confirmed by our desk within two hours.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Lightbox
        images={room.images.map((asset, i) => ({
          asset,
          title: `${room.name} — View ${i + 1}`,
        }))}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />

      <RoomBookingDialog
        room={room}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        initialRange={range}
        blockedDates={blockedDates}
        initialAdults={initialAdults > 0 ? initialAdults : 2}
        initialChildren={initialChildren}
      />
    </>
  );
}
