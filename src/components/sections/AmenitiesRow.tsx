import {
  Waves,
  Sparkles,
  UtensilsCrossed,
  Wifi,
  Car,
  Plane,
  Clock,
} from 'lucide-react';
import { hotelAmenities, type AmenityItem } from '@/src/data/hotel';
import { RevealBlock } from '@/src/components/ui/motion-primitives';

const iconMap: Record<AmenityItem['iconName'], typeof Waves> = {
  Waves,
  Sparkles,
  UtensilsCrossed,
  Wifi,
  Car,
  Plane,
  Clock,
};

export function AmenitiesRow() {
  return (
    <section className="section-pad bg-cream border-b border-line">
      <div className="site-container space-y-10">
        <RevealBlock className="max-w-xl space-y-2">
          <p className="eyebrow">House Facilities</p>
          <h2 className="font-serif text-[2.25rem] md:text-[2.75rem] text-navy">
            Included with every stay
          </h2>
        </RevealBlock>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 border-t border-l border-line">
          {hotelAmenities.map((item) => {
            const Icon = iconMap[item.iconName];
            return (
              <li
                key={item.id}
                className="border-r border-b border-line p-5 md:p-6 flex flex-col justify-between gap-4 bg-cream"
              >
                <Icon
                  className="h-5 w-5 text-gold-ink"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-navy">{item.label}</p>
                  <p className="text-xs text-muted leading-relaxed">{item.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
