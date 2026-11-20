import React, { createContext, useCallback, useContext, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export interface BookingPrefill {
  sessionType?: string;
  location?: 'HSR Extension' | 'Electronic City';
  sourcePage?: string;
}

interface BookingContextValue {
  isOpen: boolean;
  prefill: BookingPrefill;
  openDrawer: (prefill?: BookingPrefill) => void;
  closeDrawer: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});

  const openDrawer = useCallback((nextPrefill?: BookingPrefill) => {
    setPrefill(nextPrefill ?? {});
    setIsOpen(true);
    trackEvent('book_trial_open', {
      source: nextPrefill?.sourcePage ?? window.location.pathname,
      sessionType: nextPrefill?.sessionType ?? 'Free Trial',
    });
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, prefill, openDrawer, closeDrawer }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingDrawer(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBookingDrawer must be used inside BookingProvider');
  }
  return ctx;
}
