import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { media } from '@/src/data/media';
import { siteConfig } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';
import { BookingBar } from '@/src/components/booking/BookingBar';

const heroSlides = [media.heroDusk, media.heroLobby, media.heroPool];
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    if (prefersReduced) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [prefersReduced]);

  return (
    <section aria-label="Introduction" className="relative bg-cream">
      <div className="relative h-[86vh] min-h-[580px] max-h-[860px] w-full overflow-hidden bg-navy">
        {/* Ken Burns Crossfade Slider */}
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={heroSlides[activeSlide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 1.2, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            <motion.img
              src={heroSlides[activeSlide].src}
              alt={heroSlides[activeSlide].alt}
              width={heroSlides[activeSlide].width}
              height={heroSlides[activeSlide].height}
              loading="eager"
              decoding="sync"
              fetchPriority={activeSlide === 0 ? 'high' : 'auto'}
              referrerPolicy="no-referrer"
              initial={prefersReduced ? { scale: 1 } : { scale: 1.0 }}
              animate={prefersReduced ? { scale: 1 } : { scale: 1.06 }}
              transition={{ duration: 8, ease: 'linear' }}
              className="h-full w-full object-cover will-change-transform"
            />
          </motion.div>
        </AnimatePresence>

        {/* Measured contrast scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/35 to-navy/45"
        />

        {/* Hero Copy Overlay */}
        <div className="relative z-10 flex h-full items-center pt-16 pb-20">
          <div className="site-container">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="max-w-3xl space-y-5 text-cream"
            >
              <p className="eyebrow-dark">
                {siteConfig.address.district} · {siteConfig.address.city}
              </p>
              <h1 className="font-serif text-[2.75rem] sm:text-[3.75rem] lg:text-[5rem] font-semibold leading-[1.06] tracking-tight text-cream">
                Quiet sandstone courtyards, sunlit rooms, and unhurried days.
              </h1>
              <p className="max-w-xl text-base md:text-lg leading-relaxed text-cream/90">
                A 28-room heritage limestone residence built in {siteConfig.foundedYear}, framed by walled citrus gardens and seasonal dining at The Veranda.
              </p>
              <div className="pt-2">
                <Button asChild variant="gold" size="lg">
                  <Link to="/rooms">
                    Explore our rooms
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Booking Bar overlapping hero bottom edge */}
      <BookingBar />
    </section>
  );
}
