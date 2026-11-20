import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { useBookingDrawer } from '@/context/BookingContext';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const NotFoundPage: React.FC = () => {
  const { openDrawer } = useBookingDrawer();

  return (
    <>
      <SeoHead
        title="Page Not Found | Rox Boxing Gym"
        description="The page you requested could not be found. Return to Rox Boxing Gym or book your ₹0 free trial."
        path="/404"
      />

      <section className="mx-auto flex min-h-[65vh] max-w-4xl flex-col items-start justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
          404 · OUT OF BOUNDS
        </p>
        <h1 className="mt-2 font-display-rox text-6xl sm:text-8xl leading-[0.92] text-[#F6F7F2]">
          BACK TO{' '}
          <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
            the corner.
          </span>
        </h1>
        <p className="mt-4 max-w-md text-sm sm:text-base text-[#94A3B8]">
          That route doesn&apos;t exist. Head back to the main floor or book your ₹0 free trial session.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/[0.15] px-6 py-3 text-sm font-medium text-[#F4F5F7] hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Return Home
          </Link>

          <MagneticButton
            variant="volt"
            cursorMode="book"
            onClick={() => openDrawer({ sourcePage: '/404' })}
          >
            Book Free Trial
          </MagneticButton>
        </div>
      </section>
    </>
  );
};
