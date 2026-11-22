import * as React from 'react';
import { rooms } from '@/src/data/rooms';
import { formatCompactINR } from '@/src/lib/utils';
import { SeoHead } from '@/src/components/layout/SeoHead';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Badge } from '@/src/components/ui/badge';
import { Skeleton } from '@/src/components/ui/skeleton';
import { HotelImage } from '@/src/components/ui/hotel-image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import { toast } from 'sonner';

const swatches = [
  { name: 'Navy (Primary)', token: '--navy', hex: '#14213D', className: 'bg-navy text-cream' },
  { name: 'Forest (Footer Accent)', token: '--forest', hex: '#1F3A2E', className: 'bg-forest text-cream' },
  { name: 'Gold (Accent)', token: '--gold', hex: '#C9A24B', className: 'bg-gold text-navy' },
  { name: 'Gold Ink (Text on Cream)', token: '--gold-ink', hex: '#8A6A1F', className: 'bg-gold-ink text-cream' },
  { name: 'Cream (Canvas)', token: '--cream', hex: '#FAF7F2', className: 'bg-cream text-charcoal border border-line' },
  { name: 'Sand (Alt Surface)', token: '--sand', hex: '#F0EADF', className: 'bg-sand text-charcoal border border-line' },
  { name: 'Charcoal (Body)', token: '--charcoal', hex: '#22201C', className: 'bg-charcoal text-cream' },
  { name: 'Muted (Secondary)', token: '--muted', hex: '#6B665E', className: 'bg-muted text-cream' },
];

export default function DesignSystemPage() {
  const sampleRoom = rooms[0];
  const [selectVal, setSelectVal] = React.useState('suite');

  return (
    <>
      <SeoHead
        title="Design System"
        description="Internal colour, typography, and component reference for Grand Palace Hotel."
        path="/design-system"
      />

      <section className="bg-sand pt-28 pb-12 border-b border-line">
        <div className="site-container space-y-3">
          <p className="eyebrow">Internal Reference</p>
          <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-navy">
            Grand Palace Design System
          </h1>
          <p className="text-sm text-muted max-w-2xl">
            Token preview for colour contrast, Cormorant Garamond &amp; DM Sans scale, spacing, radii, and restyled shadcn/ui primitives.
          </p>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="site-container space-y-16">
          {/* Palette */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-navy border-b border-line pb-3">
              01. Colour Tokens
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {swatches.map((s) => (
                <div key={s.token} className="rounded-[6px] border border-line overflow-hidden">
                  <div className={`h-24 p-3 flex items-end justify-between text-xs ${s.className}`}>
                    <span>{s.hex}</span>
                  </div>
                  <div className="p-3 bg-cream">
                    <p className="text-sm font-medium text-navy">{s.name}</p>
                    <p className="text-xs text-muted font-mono">{s.token}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Type Scale */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-navy border-b border-line pb-3">
              02. Typography Scale
            </h2>
            <div className="space-y-4">
              <p className="eyebrow">Eyebrow label · 12px · tracking 0.18em · gold-ink</p>
              <p className="font-serif text-[5rem] leading-[1.05] font-semibold text-navy">
                Hero 5rem
              </p>
              <p className="font-serif text-[3.5rem] leading-[1.1] font-semibold text-navy">
                Display 3.5rem
              </p>
              <p className="font-serif text-[2.5rem] leading-[1.15] font-semibold text-navy">
                Section 2.5rem
              </p>
              <p className="font-serif text-[1.75rem] leading-[1.2] font-semibold text-navy">
                Card Title 1.75rem
              </p>
              <p className="text-[1.375rem] text-charcoal">Lead Copy 1.375rem (DM Sans)</p>
              <p className="text-[1.125rem] text-charcoal">Subheading 1.125rem (DM Sans)</p>
              <p className="text-[1rem] text-charcoal">
                Body 1rem (16px) — Calm, readable prose at 1.6 line-height.
              </p>
              <p className="text-[0.875rem] text-muted">Small / Meta 0.875rem (DM Sans)</p>
            </div>
          </div>

          {/* Buttons & Chips */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-navy border-b border-line pb-3">
              03. Buttons &amp; Chips
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" onClick={() => toast('Primary action pressed')}>
                Primary Navy
              </Button>
              <Button variant="gold">Gold Accent</Button>
              <Button variant="forest">Forest Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Drawing underline link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="default">Default Chip</Badge>
              <Badge variant="navy">Navy Chip</Badge>
              <Badge variant="gold">Gold Chip</Badge>
              <Badge variant="success">Confirmed</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Validation Error</Badge>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-navy border-b border-line pb-3">
              04. Inputs &amp; Controls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="ds-input" requiredMark>
                  Text Input
                </Label>
                <Input id="ds-input" placeholder="Guest full name" />
              </div>
              <div>
                <Label htmlFor="ds-error">Error State Input</Label>
                <Input id="ds-error" hasError defaultValue="invalid@" />
                <p className="mt-1 text-xs text-error">Please enter a valid email address.</p>
              </div>
              <div>
                <Label htmlFor="ds-select">Select Control</Label>
                <Select value={selectVal} onValueChange={setSelectVal}>
                  <SelectTrigger id="ds-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                    <SelectItem value="suite">Executive Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="max-w-xl">
              <Label htmlFor="ds-textarea">Textarea</Label>
              <Textarea id="ds-textarea" placeholder="Dietary or arrival note..." />
            </div>
          </div>

          {/* Cards, Tabs, Accordion, Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-serif text-2xl text-navy">05. Sample Room Card</h2>
              <article className="rounded-[6px] border border-line bg-cream overflow-hidden shadow-[var(--shadow-1)]">
                <HotelImage asset={sampleRoom.images[0]} aspectClass="aspect-[4/3]" />
                <div className="p-6 space-y-3">
                  <p className="text-xs text-muted tabular-nums">
                    {sampleRoom.sizeSqM} sq m · {sampleRoom.bedType}
                  </p>
                  <h3 className="font-serif text-2xl text-navy">{sampleRoom.name}</h3>
                  <p className="text-sm text-muted">{sampleRoom.shortTagline}</p>
                  <div className="pt-3 border-t border-line flex items-center justify-between">
                    <span className="font-medium text-navy tabular-nums">
                      From {formatCompactINR(sampleRoom.ratePerNight)} / night
                    </span>
                    <Button size="sm" variant="primary">
                      Book now
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <h2 className="font-serif text-2xl text-navy">06. Tabs &amp; Accordion</h2>
                <Tabs defaultValue="tab-1">
                  <TabsList>
                    <TabsTrigger value="tab-1">Overview</TabsTrigger>
                    <TabsTrigger value="tab-2">Policies</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab-1">
                    <p className="text-sm text-muted">
                      Clean hairline tab indicator without pill backgrounds.
                    </p>
                  </TabsContent>
                  <TabsContent value="tab-2">
                    <p className="text-sm text-muted">
                      Check-in from 14:00, check-out until 11:00.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Sample policy item</AccordionTrigger>
                  <AccordionContent>
                    Calm collapsible disclosure using Cormorant Garamond triggers.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  Loading Skeleton
                </p>
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
