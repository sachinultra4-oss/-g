import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/src/config/site';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  schemaType?: 'Hotel' | 'Restaurant';
  image?: string;
}

export function SeoHead({
  title,
  description,
  path,
  schemaType,
  image = '/src/assets/images/hero_palace_dusk_1795348994601.jpg',
}: SeoHeadProps) {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${origin}${path}`;
  const fullTitle = `${title} — ${siteConfig.name}`;

  const schemaJson =
    schemaType === 'Hotel'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Hotel',
          name: siteConfig.name,
          description: siteConfig.description,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          url: canonicalUrl,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.region,
            postalCode: siteConfig.address.postalCode,
            addressCountry: siteConfig.address.country,
          },
          checkinTime: siteConfig.hours.checkIn,
          checkoutTime: siteConfig.hours.checkOut,
          priceRange: 'INR 12,500 - INR 36,500',
        }
      : schemaType === 'Restaurant'
        ? {
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: `The Veranda at ${siteConfig.name}`,
            description,
            servesCuisine: ['Seasonal Indian', 'Coastal Seafood', 'Continental'],
            telephone: siteConfig.phone,
            url: canonicalUrl,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteConfig.address.street,
              addressLocality: siteConfig.address.city,
              addressRegion: siteConfig.address.region,
              postalCode: siteConfig.address.postalCode,
              addressCountry: siteConfig.address.country,
            },
            openingHours: ['Mo-Su 07:00-10:30', 'Mo-Su 12:30-15:00', 'Mo-Su 19:00-22:30'],
            acceptsReservations: 'True',
          }
        : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${origin}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${origin}${image}`} />

      {schemaJson && (
        <script type="application/ld+json">{JSON.stringify(schemaJson)}</script>
      )}
    </Helmet>
  );
}
