import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BookingProvider } from '@/context/BookingContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { BookingDrawer } from '@/components/booking/BookingDrawer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { initAnalytics } from '@/lib/analytics';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const ProgramsPage = lazy(() =>
  import('@/pages/ProgramsPage').then((m) => ({ default: m.ProgramsPage }))
);
const CoachesPage = lazy(() =>
  import('@/pages/CoachesPage').then((m) => ({ default: m.CoachesPage }))
);
const LocationsPage = lazy(() =>
  import('@/pages/LocationsPage').then((m) => ({ default: m.LocationsPage }))
);
const FaqPage = lazy(() =>
  import('@/pages/FaqPage').then((m) => ({ default: m.FaqPage }))
);
const BookTrialPage = lazy(() =>
  import('@/pages/BookTrialPage').then((m) => ({ default: m.BookTrialPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };
      if (!scrollToHash()) {
        const timer = window.setTimeout(scrollToHash, 250);
        return () => window.clearTimeout(timer);
      }
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <HelmetProvider>
      <BookingProvider>
        <BrowserRouter>
          <ScrollToTop />

          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-[#D4AF37] focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:font-bold focus:text-[#060B18]"
          >
            Skip to main content
          </a>

          <div className="grain-overlay" aria-hidden="true" />
          <CustomCursor />

          <Navbar />

          <main id="main-content" className="min-h-[70vh]">
            <Suspense
              fallback={
                <div className="mx-auto max-w-7xl px-4 py-24 font-mono text-xs text-[#94A3B8]">
                  Loading Rox Boxing Gym...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/coaches" element={<CoachesPage />} />
                <Route path="/locations" element={<LocationsPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/book-trial" element={<BookTrialPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <MobileStickyBar />
          <BookingDrawer />
        </BrowserRouter>
      </BookingProvider>
    </HelmetProvider>
  );
}

export default App;
