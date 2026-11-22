import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '@/src/config/site';

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(
    `Hello ${siteConfig.name}, I would like assistance with a booking request.`
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Grand Palace Hotel on WhatsApp"
      className="fixed bottom-4 right-4 z-30 inline-flex h-12 items-center gap-2 rounded-[999px] bg-forest px-4 text-sm font-medium text-cream shadow-[var(--shadow-2)] border border-cream/15 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp Desk</span>
    </a>
  );
}
