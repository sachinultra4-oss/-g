import * as React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { siteConfig } from '@/src/config/site';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';

const navLinks = [
  { to: '/rooms', label: 'Rooms' },
  { to: '/dining', label: 'Dining' },
  { to: '/reserve', label: 'Reserve' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const overHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        overHero
          ? 'bg-gradient-to-b from-navy/55 via-navy/25 to-transparent text-cream border-b border-transparent'
          : 'bg-cream/95 text-navy border-b border-line backdrop-blur-sm shadow-[var(--shadow-1)]'
      )}
    >
      <div className="site-container flex h-[72px] items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          className={cn(
            'font-serif text-xl md:text-2xl font-semibold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-[2px]',
            overHero ? 'text-cream' : 'text-navy'
          )}
        >
          {siteConfig.name}
        </Link>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-7"
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'draw-underline text-sm font-medium whitespace-nowrap shrink-0 py-2 transition-colors duration-150',
                  overHero
                    ? isActive
                      ? 'text-gold'
                      : 'text-cream/95 hover:text-cream'
                    : isActive
                      ? 'text-navy'
                      : 'text-charcoal/80 hover:text-navy'
                )
              }
            >
              {({ isActive }) => (
                <span data-active={isActive ? 'true' : undefined}>{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            asChild
            variant={overHero ? 'gold' : 'primary'}
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link to="/rooms">Book a room</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                className={cn(
                  'md:hidden inline-flex h-11 w-11 items-center justify-center rounded-[2px] transition-colors cursor-pointer',
                  overHero
                    ? 'text-cream hover:bg-cream/15'
                    : 'text-navy hover:bg-sand'
                )}
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="mt-6 flex flex-col gap-1">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    cn(
                      'min-h-[44px] flex items-center px-2 text-base font-medium border-b border-line/60',
                      isActive ? 'text-navy font-semibold' : 'text-charcoal'
                    )
                  }
                >
                  Home
                </NavLink>
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'min-h-[44px] flex items-center px-2 text-base font-medium border-b border-line/60',
                        isActive ? 'text-navy font-semibold' : 'text-charcoal'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild variant="primary" className="w-full">
                  <Link to="/rooms">Book a room</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/reserve">Reserve a table</Link>
                </Button>
              </div>
              <div className="mt-auto pt-6 border-t border-line text-xs text-muted space-y-1">
                <p>{siteConfig.address.districtOnly}</p>
                <p>{siteConfig.phone}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
