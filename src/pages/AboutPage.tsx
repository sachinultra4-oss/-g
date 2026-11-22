import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '@/src/config/site';
import { media } from '@/src/data/media';
import { teamMembers } from '@/src/data/hotel';
import {
  submitContactEnquiry,
  type ContactEnquiry,
} from '@/src/services/reservations';
import { SeoHead } from '@/src/components/layout/SeoHead';
import { HotelImage } from '@/src/components/ui/hotel-image';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { RevealBlock } from '@/src/components/ui/motion-primitives';
import { toast } from 'sonner';

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string().trim().max(20, 'Phone number appears too long.').optional(),
  subject: z.string().trim().min(3, 'Please enter a subject.'),
  message: z.string().trim().min(10, 'Please include a brief message (at least 10 characters).'),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

export default function AboutPage() {
  const [submitted, setSubmitted] = React.useState<ContactEnquiry | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: EnquiryValues) => {
    const record = await submitContactEnquiry(values);
    setSubmitted(record);
    toast.success(`Enquiry ${record.referenceNumber} sent.`);
  };

  return (
    <>
      <SeoHead
        title="About & Contact"
        description="Learn the story of Grand Palace Hotel, meet the house leadership team, and contact our 24-hour desk in Civil Lines."
        path="/about"
        schemaType="Hotel"
      />

      {/* Story Split */}
      <section className="bg-sand pt-28 pb-16 border-b border-line">
        <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <RevealBlock className="space-y-3">
              <p className="eyebrow">Since {siteConfig.foundedYear}</p>
              <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-navy">
                A quiet limestone residence in Civil Lines
              </h1>
            </RevealBlock>
            <p className="text-base text-charcoal/90 leading-relaxed">
              Built in {siteConfig.foundedYear} as a private winter residence and carefully restored in {siteConfig.restoredYear}, {siteConfig.name} preserves original hand-cut sandstone colonnades, limewashed interiors, and four acres of walled citrus and rose gardens.
            </p>
            <p className="text-base text-muted leading-relaxed">
              With only twenty-eight rooms and suites, the house moves at a measured pace—quiet mornings by the lap pool, unhurried afternoon tea in the library, and lantern-lit suppers at The Veranda.
            </p>
          </div>
          <div className="lg:col-span-6">
            <HotelImage
              asset={media.heroLobby}
              aspectClass="aspect-[4/3]"
              className="rounded-[6px] shadow-[var(--shadow-2)]"
              eager
              priority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* House Team */}
      <section className="section-pad bg-cream border-b border-line">
        <div className="site-container space-y-10">
          <RevealBlock className="max-w-2xl space-y-2">
            <p className="eyebrow">House Leadership (Sample Team Profiles)</p>
            <h2 className="font-serif text-[2.25rem] md:text-[2.75rem] text-navy">
              The team hosting your stay
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-line pt-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="space-y-2.5">
                <h3 className="font-serif text-xl text-navy">{member.name}</h3>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-ink font-medium">
                  {member.role}
                </p>
                <p className="text-sm text-muted leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + District Map Placeholder */}
      <section className="section-pad bg-cream">
        <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Direct Contacts & Address-by-District Map Placeholder */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <p className="eyebrow">Direct Desk</p>
              <h2 className="font-serif text-[2rem] md:text-[2.5rem] text-navy">
                Reach us anytime
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 pb-4 border-b border-line">
                <MapPin className="h-4 w-4 text-gold-ink shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-medium text-navy">Location</p>
                  <p className="text-muted">{siteConfig.address.districtOnly}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-line">
                <Phone className="h-4 w-4 text-gold-ink shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-medium text-navy">Telephone (24h Front Desk)</p>
                  <a
                    href={siteConfig.phoneHref}
                    className="text-charcoal hover:text-gold-ink transition-colors inline-block py-1"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-line">
                <Mail className="h-4 w-4 text-gold-ink shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-medium text-navy">Reservations Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-charcoal hover:text-gold-ink transition-colors inline-block py-1"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            <Button asChild variant="forest" className="w-full sm:w-auto">
              <a
                href={buildWhatsAppUrl(
                  `Hello ${siteConfig.name}, I would like to speak with the concierge desk.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.5} />
                Message on WhatsApp
              </a>
            </Button>

            {/* District Map Placeholder */}
            <div className="rounded-[6px] border border-line bg-sand/70 p-6 space-y-3">
              <p className="eyebrow">District Map Preview</p>
              <div className="aspect-[16/10] rounded-[4px] border border-line bg-cream flex flex-col items-center justify-center p-6 text-center space-y-2">
                <MapPin className="h-6 w-6 text-navy" strokeWidth={1.5} aria-hidden="true" />
                <p className="font-serif text-lg font-semibold text-navy">
                  {siteConfig.name}
                </p>
                <p className="text-xs text-muted max-w-xs">
                  {siteConfig.address.districtOnly} · 15 minutes from Jaipur Junction &amp; 25 minutes from the airport
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[6px] border border-line bg-sand/40 p-6 md:p-10 space-y-6">
              <div className="space-y-1.5">
                <p className="eyebrow">General Enquiry</p>
                <h2 className="font-serif text-2xl md:text-3xl text-navy">
                  Send a note to our concierge
                </h2>
              </div>

              {submitted ? (
                <div className="rounded-[6px] border border-line bg-cream p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl text-navy">
                        Enquiry Received ({submitted.referenceNumber})
                      </h3>
                      <p className="text-sm text-muted">
                        Thank you, {submitted.name}. Our front desk will reply to {submitted.email}.
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSubmitted(null);
                      reset();
                    }}
                  >
                    Send another enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="enq-name" requiredMark>
                        Full name
                      </Label>
                      <Input
                        id="enq-name"
                        placeholder="Your name"
                        hasError={Boolean(errors.name)}
                        {...register('name')}
                      />
                      <div aria-live="polite">
                        {errors.name && (
                          <p className="mt-1 text-xs text-error">{errors.name.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="enq-email" requiredMark>
                        Email address
                      </Label>
                      <Input
                        id="enq-email"
                        type="email"
                        placeholder="you@example.com"
                        hasError={Boolean(errors.email)}
                        {...register('email')}
                      />
                      <div aria-live="polite">
                        {errors.email && (
                          <p className="mt-1 text-xs text-error">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="enq-phone">Phone (optional)</Label>
                      <Input
                        id="enq-phone"
                        type="tel"
                        placeholder="+91 98000 00000"
                        hasError={Boolean(errors.phone)}
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="enq-subject" requiredMark>
                        Subject
                      </Label>
                      <Input
                        id="enq-subject"
                        placeholder="Private dinner, airport pickup, group stay"
                        hasError={Boolean(errors.subject)}
                        {...register('subject')}
                      />
                      <div aria-live="polite">
                        {errors.subject && (
                          <p className="mt-1 text-xs text-error">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="enq-message" requiredMark>
                      Message
                    </Label>
                    <Textarea
                      id="enq-message"
                      rows={4}
                      placeholder="How may our house team help?"
                      hasError={Boolean(errors.message)}
                      {...register('message')}
                    />
                    <div aria-live="polite">
                      {errors.message && (
                        <p className="mt-1 text-xs text-error">{errors.message.message}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending enquiry...' : 'Send enquiry'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
