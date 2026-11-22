import { Link } from 'react-router-dom';
import { SeoHead } from '@/src/components/layout/SeoHead';
import { Button } from '@/src/components/ui/button';

export default function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page Not Found"
        description="The requested page could not be found at Grand Palace Hotel."
        path="/404"
      />
      <section className="min-h-[75vh] bg-cream flex items-center justify-center pt-24 pb-16">
        <div className="site-container max-w-xl text-center space-y-6">
          <p className="eyebrow">404 · Page Not Found</p>
          <h1 className="font-serif text-[2.75rem] md:text-[3.5rem] text-navy">
            This courtyard door leads nowhere
          </h1>
          <p className="text-base text-muted leading-relaxed">
            The address you followed may have moved. Return to our main residence page or browse our eight room types.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary">
              <Link to="/">Return home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/rooms">Browse rooms</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
