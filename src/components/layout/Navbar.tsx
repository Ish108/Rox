import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CLUB } from '@/data/club';
import { getGymStatusIST } from '@/lib/timings';
import { useBookingDrawer } from '@/context/BookingContext';
import { MagneticButton } from '@/components/ui/MagneticButton';

const NAV_LINKS = [
  { to: '/programs', label: 'Programs' },
  { to: '/#r05', label: 'Membership' },
  { to: '/coaches', label: 'Coaches' },
  { to: '/locations', label: 'Locations' },
  { to: '/faq', label: 'FAQ' },
];

const SPRING = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 } as const;

/**
 * Floating Glassmorphic Pill Navbar with Morphing Indicator
 * Adapted from 21st.dev Floating Glassmorphic Navbar and themed for Rox Boxing Gym.
 */
export const Navbar: React.FC = () => {
  const { openDrawer } = useBookingDrawer();
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState(() => getGymStatusIST());

  useEffect(() => {
    const id = window.setInterval(() => {
      setStatus(getGymStatusIST());
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const currentRoute =
    location.pathname === '/' && location.hash === '#r05'
      ? '/#r05'
      : location.pathname;
  const highlighted = hovered ?? currentRoute;

  const handleLinkClick = (to: string) => {
    setMobileOpen(false);
    if (to === '/#r05' && location.pathname === '/') {
      document.getElementById('r05')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className="sticky top-3 z-50 mx-auto w-full max-w-6xl px-3 sm:px-6">
        <div
          className={`flex h-16 items-center justify-between gap-3 rounded-full border px-4 sm:px-6 transition-all duration-300 backdrop-blur-xl ${
            scrolled
              ? 'border-[#D4AF37]/25 bg-[#050507]/90 shadow-[0_14px_45px_rgba(0,0,0,0.6)]'
              : 'border-slate-400/20 bg-[#08090E]/80 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Left: ROX Crest + Compact IST Live Dot */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label={`${CLUB.name} Home`}
              className="group flex items-center gap-2.5"
            >
              <img
                src="/rox-logo.png"
                alt={`${CLUB.name} — ${CLUB.cultureLine}`}
                width={84}
                height={56}
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                style={{
                  filter: 'drop-shadow(0 2px 10px rgba(212, 175, 55, 0.25))',
                }}
              />
            </Link>

            <div
              aria-live="polite"
              title={status.label}
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-slate-400/15 bg-[#060B18]/75 px-3 py-1"
            >
              <span className="relative flex h-2 w-2">
                {status.isLive && !prefersReducedMotion ? (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E599] opacity-75" />
                ) : null}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    status.isLive ? 'bg-[#00E599]' : 'bg-[#D4AF37]'
                  }`}
                />
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[#F4F5F7]">
                {status.label}
              </span>
            </div>
          </div>

          {/* Center: Morphing Pill Navigation */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center">
            <ul role="list" className="flex items-center gap-1 rounded-full bg-[#060B18]/55 p-1 border border-slate-400/10">
              {NAV_LINKS.map((item) => {
                const isActive = currentRoute === item.to;
                const isHighlighted = highlighted === item.to;

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => handleLinkClick(item.to)}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(item.to)}
                      onPointerLeave={() => setHovered(null)}
                      onFocus={() => setHovered(item.to)}
                      onBlur={() => setHovered(null)}
                      className={`relative isolate flex items-center rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                        isHighlighted ? 'text-[#060B18] font-semibold' : 'text-[#F4F5F7]/85 hover:text-[#F4F5F7]'
                      }`}
                    >
                      {isHighlighted ? (
                        <motion.span
                          layoutId="nav-morph-pill"
                          aria-hidden="true"
                          transition={prefersReducedMotion ? { duration: 0 } : SPRING}
                          className="bg-emerald-grad absolute inset-0 -z-10 rounded-full"
                        />
                      ) : null}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Gold CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <MagneticButton
              variant="volt"
              cursorMode="book"
              onClick={() => openDrawer({ sourcePage: location.pathname })}
              className="hidden md:inline-flex px-5 py-2 min-h-[38px] text-xs uppercase tracking-wider"
            >
              Book Free Trial
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-400/20 bg-[#060B18]/80 text-[#F4F5F7] md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Sheet Menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[2500] flex flex-col justify-between bg-[#060B18] p-6 md:hidden"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-400/15 pb-4">
                <img
                  src="/rox-logo.png"
                  alt={CLUB.name}
                  width={84}
                  height={56}
                  className="h-10 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-400/20 bg-navy-card text-[#F4F5F7]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-400/15 bg-navy-card px-3 py-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.isLive ? 'bg-[#00E599]' : 'bg-[#D4AF37]'
                  }`}
                />
                <span className="font-mono text-[11px] text-[#F4F5F7]">
                  {status.label}
                </span>
              </div>

              <nav aria-label="Mobile links" className="mt-8 flex flex-col gap-3">
                <Link
                  to="/"
                  className="min-h-[48px] flex items-center font-display-rox text-4xl text-[#F4F5F7] hover:text-[#D4AF37]"
                >
                  Home
                </Link>
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => handleLinkClick(item.to)}
                    className="min-h-[48px] flex items-center font-display-rox text-4xl text-[#F4F5F7] hover:text-[#D4AF37]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-3 border-t border-slate-400/15 pt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openDrawer({ sourcePage: location.pathname });
                }}
                className="bg-gold-grad flex min-h-[48px] w-full items-center justify-center rounded-full px-6 py-3 font-semibold text-[#060B18]"
              >
                Book Free Trial (₹0)
              </button>
              <p className="text-center font-mono text-xs text-[#94A3B8]">
                HSR Extension &amp; Electronic City · Bengaluru
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
