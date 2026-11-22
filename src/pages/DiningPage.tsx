import { Link } from 'react-router-dom';
import { media } from '@/src/data/media';
import {
  chefSpecials,
  diningHours,
  menuItems,
  type MenuCategory,
} from '@/src/data/dining';
import { formatCompactINR } from '@/src/lib/utils';
import { SeoHead } from '@/src/components/layout/SeoHead';
import { HotelImage } from '@/src/components/ui/hotel-image';
import { Button } from '@/src/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { RevealBlock } from '@/src/components/ui/motion-primitives';

const CATEGORIES: MenuCategory[] = ['Starters', 'Mains', 'Desserts', 'Drinks'];

export default function DiningPage() {
  return (
    <>
      <SeoHead
        title="The Veranda Dining"
        description="Seasonal dining at The Veranda: coastal seafood, heirloom grains, and botanical cocktails served in our arched limestone courtyard."
        path="/dining"
        schemaType="Restaurant"
        image={media.diningHall.src}
      />

      {/* Intro Split */}
      <section className="bg-sand pt-28 pb-16 border-b border-line">
        <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <RevealBlock className="space-y-3">
              <p className="eyebrow">The Veranda</p>
              <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-navy">
                Seasonal Kitchen &amp; Courtyard Bar
              </h1>
              <p className="text-base text-charcoal/90 leading-relaxed max-w-xl">
                Set beneath the sandstone colonnade, The Veranda serves a changing menu shaped by morning market deliveries, coastal catch, and herbs picked from the south garden.
              </p>
            </RevealBlock>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild variant="primary" size="lg">
                <Link to="/reserve">Reserve a table</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HotelImage
              asset={media.diningHall}
              aspectClass="aspect-[4/3]"
              className="rounded-[6px] shadow-[var(--shadow-2)]"
              eager
              priority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Chef Specials */}
      <section className="section-pad bg-cream border-b border-line">
        <div className="site-container space-y-10">
          <RevealBlock className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="eyebrow">From the Pass</p>
              <h2 className="font-serif text-[2.25rem] md:text-[2.75rem] text-navy">
                Chef Specials This Season
              </h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <HotelImage
                asset={media.diningPlate}
                aspectClass="aspect-[4/3]"
                className="rounded-[6px]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

            <div className="lg:col-span-7 divide-y divide-line border-t border-b border-line">
              {chefSpecials.map((special) => (
                <div key={special.id} className="py-6 space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl text-navy">{special.title}</h3>
                    <span className="font-medium text-navy tabular-nums">
                      {formatCompactINR(special.price)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gold-ink">{special.subtitle}</p>
                  <p className="text-sm text-muted leading-relaxed">{special.description}</p>
                  <p className="text-xs text-charcoal/80 pt-1">{special.pairing}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Menu */}
      <section className="section-pad bg-cream">
        <div className="site-container space-y-10">
          <RevealBlock className="space-y-2 max-w-2xl">
            <p className="eyebrow">Menu Highlights</p>
            <h2 className="font-serif text-[2.25rem] md:text-[2.75rem] text-navy">
              Kitchen &amp; Cellar Selection
            </h2>
          </RevealBlock>

          <Tabs defaultValue="Starters">
            <TabsList aria-label="Menu categories">
              {CATEGORIES.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="border-b border-line pb-5 flex items-start justify-between gap-6"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <h3 className="font-serif text-xl text-navy">{item.name}</h3>
                            {item.dietary && (
                              <span className="text-xs text-gold-ink">
                                · {item.dietary}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <span className="font-medium text-sm text-navy tabular-nums shrink-0 pt-1">
                          {formatCompactINR(item.price)}
                        </span>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Ambience & Hours */}
      <section className="section-pad bg-sand border-t border-line">
        <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <HotelImage
              asset={media.morningBreakfast}
              aspectClass="aspect-[4/3]"
              className="rounded-[6px]"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <HotelImage
              asset={media.eveningEvents}
              aspectClass="aspect-[4/3]"
              className="rounded-[6px]"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="eyebrow">Service Hours</p>
              <h2 className="font-serif text-[2rem] md:text-[2.5rem] text-navy">
                Morning through evening
              </h2>
            </div>

            <dl className="divide-y divide-line border-t border-b border-line">
              {diningHours.map((slot) => (
                <div
                  key={slot.service}
                  className="py-3.5 flex flex-wrap items-baseline justify-between gap-2 text-sm"
                >
                  <div>
                    <dt className="font-medium text-charcoal">{slot.service}</dt>
                    <dd className="text-xs text-muted">{slot.note}</dd>
                  </div>
                  <dd className="font-medium text-navy tabular-nums">{slot.hours}</dd>
                </div>
              ))}
            </dl>

            <Button asChild variant="primary">
              <Link to="/reserve">Reserve a table</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
