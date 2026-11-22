import * as React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { ErrorBoundary } from '@/src/components/layout/ErrorBoundary';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { FloatingWhatsApp } from '@/src/components/layout/FloatingWhatsApp';
import { Toaster } from '@/src/components/ui/sonner';
import { Skeleton } from '@/src/components/ui/skeleton';

const HomePage = React.lazy(() => import('@/src/pages/HomePage'));
const RoomsPage = React.lazy(() => import('@/src/pages/RoomsPage'));
const RoomDetailPage = React.lazy(() => import('@/src/pages/RoomDetailPage'));
const DiningPage = React.lazy(() => import('@/src/pages/DiningPage'));
const ReservePage = React.lazy(() => import('@/src/pages/ReservePage'));
const GalleryPage = React.lazy(() => import('@/src/pages/GalleryPage'));
const AboutPage = React.lazy(() => import('@/src/pages/AboutPage'));
const DesignSystemPage = React.lazy(() => import('@/src/pages/DesignSystemPage'));
const NotFoundPage = React.lazy(() => import('@/src/pages/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function RouteFallback() {
  return (
    <div className="site-container pt-36 pb-24 space-y-6">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-14 w-2/3" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        id="main-content"
        key={location.pathname}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={prefersReduced ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        <React.Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/rooms/:slug" element={<RoomDetailPage />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/reserve" element={<ReservePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-cream text-charcoal">
              <Navbar />
              <AnimatedRoutes />
              <Footer />
              <FloatingWhatsApp />
              <Toaster />
            </div>
          </BrowserRouter>
        </MotionConfig>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
