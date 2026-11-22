import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/button';
import { RevealBlock } from '@/src/components/ui/motion-primitives';

export function ClosingCtaSection() {
  return (
    <section className="bg-navy text-cream py-20 lg:py-28 border-t border-cream/10">
      <div className="site-container">
        <RevealBlock className="max-w-2xl mx-auto text-center space-y-6">
          <div className="mx-auto h-px w-16 bg-gold" aria-hidden="true" />
          <p className="eyebrow-dark">Plan Your Visit</p>
          <h2 className="font-serif text-[2.25rem] md:text-[3.25rem] text-cream">
            Stay the weekend or join us for dinner
          </h2>
          <p className="text-base text-cream/80 leading-relaxed">
            Send a room booking request directly to our front desk or reserve an evening table under the Veranda arches.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link to="/rooms">Book a room</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/reserve">Reserve a table</Link>
            </Button>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
