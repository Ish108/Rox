import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { CLUB } from '@/data/club';
import { useBookingDrawer } from '@/context/BookingContext';
import { trackEvent } from '@/lib/analytics';

export const MobileStickyBar: React.FC = () => {
  const { openDrawer } = useBookingDrawer();
  const location = useLocation();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-400/15 bg-[#060B18]/95 p-3 backdrop-blur-lg md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <button
          type="button"
          onClick={() => openDrawer({ sourcePage: location.pathname })}
          className="bg-gold-grad flex min-h-[44px] flex-1 items-center justify-center rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#060B18]"
        >
          Book Free Trial
        </button>

        <a
          href={CLUB.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { source: 'mobile_sticky_bar' })}
          aria-label="Chat with Rox Boxing Gym on WhatsApp"
          className="bg-navy-card flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-slate-400/20 px-4 py-2.5 text-xs font-medium text-[#F4F5F7]"
        >
          <MessageCircle className="h-4 w-4 text-[#00E599]" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
};
