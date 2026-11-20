import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useBookingDrawer } from '@/context/BookingContext';
import { BookingForm } from './BookingForm';

export const BookingDrawer: React.FC = () => {
  const { isOpen, prefill, closeDrawer } = useBookingDrawer();
  const prefersReducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    // Move initial focus to close button
    const timer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          className="fixed inset-0 z-[2500] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <motion.div
            ref={drawerRef}
            initial={prefersReducedMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className="bg-navy-card relative z-10 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-slate-400/15 p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00E599]">
                  FREE INTRODUCTORY SESSION · ₹0
                </p>
                <h2
                  id="booking-drawer-title"
                  className="mt-1 font-display-rox text-3xl text-[#F4F5F7]"
                >
                  STEP INTO THE RING
                </h2>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeDrawer}
                aria-label="Close booking drawer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-[#060B18] text-[#F4F5F7] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flex-1">
              <BookingForm
                defaultSessionType={prefill.sessionType}
                defaultLocation={prefill.location}
                sourcePage={prefill.sourcePage}
                onSuccessClose={closeDrawer}
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};
