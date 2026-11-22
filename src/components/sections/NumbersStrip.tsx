import { hotelStats } from '@/src/data/hotel';
import { AnimatedCounter, RevealBlock } from '@/src/components/ui/motion-primitives';

export function NumbersStrip() {
  return (
    <section aria-label="Hotel by the numbers" className="bg-navy text-cream py-16 lg:py-24">
      <div className="site-container space-y-10">
        <RevealBlock className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cream/15 pb-6">
          <div>
            <p className="eyebrow-dark">By the numbers</p>
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] text-cream mt-1">
              Scale kept deliberately intimate
            </h2>
          </div>
        </RevealBlock>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotelStats.map((stat) => (
            <div key={stat.id} className="space-y-2">
              <dd className="font-serif text-[3rem] lg:text-[3.5rem] font-semibold leading-none text-gold">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="text-base font-medium text-cream pt-1">{stat.label}</dt>
              <p className="text-sm text-cream/70">{stat.detail}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
