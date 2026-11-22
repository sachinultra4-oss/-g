import { SeoHead } from '@/src/components/layout/SeoHead';
import { HeroSection } from '@/src/components/sections/HeroSection';
import { FeaturedRoomsSection } from '@/src/components/sections/FeaturedRoomsSection';
import { DiningPreviewSection } from '@/src/components/sections/DiningPreviewSection';
import { AmenitiesRow } from '@/src/components/sections/AmenitiesRow';
import { OffersSection } from '@/src/components/sections/OffersSection';
import { NumbersStrip } from '@/src/components/sections/NumbersStrip';
import { TestimonialsSection } from '@/src/components/sections/TestimonialsSection';
import { InstagramStrip } from '@/src/components/sections/InstagramStrip';
import { ClosingCtaSection } from '@/src/components/sections/ClosingCtaSection';
import { siteConfig } from '@/src/config/site';

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="Quiet Heritage Boutique Hotel & Dining"
        description={siteConfig.description}
        path="/"
        schemaType="Hotel"
      />
      <HeroSection />
      <FeaturedRoomsSection />
      <DiningPreviewSection />
      <AmenitiesRow />
      <OffersSection />
      <NumbersStrip />
      <TestimonialsSection />
      <InstagramStrip />
      <ClosingCtaSection />
    </>
  );
}
