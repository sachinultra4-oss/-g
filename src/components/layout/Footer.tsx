import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '@/src/config/site';

export function Footer() {
  const whatsappHref = buildWhatsAppUrl(
    `Hello ${siteConfig.name}, I would like to enquire about an upcoming stay.`
  );

  return (
    <footer className="bg-forest text-cream border-t border-cream/10">
      <div className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand & Address */}
          <div className="md:col-span-5 space-y-5">
            <div>
              <p className="font-serif text-2xl font-semibold text-cream">
                {siteConfig.name}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/80">
                {siteConfig.tagline}
              </p>
            </div>

            <div className="space-y-2.5 text-sm text-cream/85 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  {siteConfig.address.shortLine}, {siteConfig.address.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a
                  href={siteConfig.phoneHref}
                  className="hover:text-gold transition-colors py-1"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold transition-colors py-1"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-gold shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors py-1"
                >
                  WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Hotel Navigation */}
          <div className="md:col-span-3">
            <p className="eyebrow-dark mb-4">Explore</p>
            <ul className="space-y-2.5 text-sm text-cream/85">
              <li>
                <Link to="/rooms" className="draw-underline hover:text-gold py-1">
                  Rooms &amp; Suites
                </Link>
              </li>
              <li>
                <Link to="/dining" className="draw-underline hover:text-gold py-1">
                  The Veranda Dining
                </Link>
              </li>
              <li>
                <Link to="/reserve" className="draw-underline hover:text-gold py-1">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="draw-underline hover:text-gold py-1">
                  Gallery &amp; Grounds
                </Link>
              </li>
              <li>
                <Link to="/about" className="draw-underline hover:text-gold py-1">
                  About &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div className="md:col-span-4">
            <p className="eyebrow-dark mb-4">House Hours</p>
            <dl className="space-y-2 text-sm text-cream/85">
              <div className="flex justify-between gap-4 border-b border-cream/10 pb-2">
                <dt className="text-cream/70">Check-in / Check-out</dt>
                <dd className="tabular-nums">
                  {siteConfig.hours.checkIn} / {siteConfig.hours.checkOut}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-cream/10 pb-2">
                <dt className="text-cream/70">Breakfast Terrace</dt>
                <dd className="tabular-nums">{siteConfig.hours.breakfast}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-cream/10 pb-2">
                <dt className="text-cream/70">Veranda Dinner</dt>
                <dd className="tabular-nums">{siteConfig.hours.dinner}</dd>
              </div>
              <div className="flex justify-between gap-4 pb-2">
                <dt className="text-cream/70">Stone Spa</dt>
                <dd className="tabular-nums">{siteConfig.hours.spa}</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-5 text-sm text-cream/80">
              <a
                href={siteConfig.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-underline hover:text-gold"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-underline hover:text-gold"
              >
                Facebook
              </a>
              <a
                href={siteConfig.social.pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-underline hover:text-gold"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-cream/65">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.imageCredits}</p>
        </div>
      </div>
    </footer>
  );
}
