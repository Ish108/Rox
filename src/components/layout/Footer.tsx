import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { z } from 'zod';
import { CLUB, LOCATIONS, PROGRAMS } from '@/data/club';
import { FAQS } from '@/data/faqs';
import { submitEmailSignup } from '@/lib/leads';
import { trackEvent } from '@/lib/analytics';
import { MinimalFaqAccordion } from '@/components/ui/MinimalFaqAccordion';

const emailSchema = z.string().trim().email('Enter a valid email address');

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const teaserFaqs = FAQS.filter((f) => f.teaser).slice(0, 3);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Invalid email');
      return;
    }

    setLoading(true);
    const res = await submitEmailSignup(parsed.data, 'footer_trial_pass', honeypot);
    setLoading(false);

    if (!res.saved) {
      setError(res.errorMessage ?? 'Could not save right now. Try WhatsApp.');
      return;
    }

    trackEvent('email_signup', { source: 'footer' });
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-slate-400/15 bg-[#050507] pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
        {/* Minimalistic Centered FAQ Teaser */}
        <div className="mb-20 py-4 text-center">
          <span className="inline-flex items-center rounded-full border border-white/[0.1] bg-[#0A0C12] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight">
            <span className="text-[#94A3B8]">Answers before</span>{' '}
            <span className="text-[#F6F7F2]">you ask</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base sm:text-lg leading-relaxed text-[#CBD5E1]/85">
            Quick answers before your first session. Still unsure? Message us on WhatsApp.
          </p>

          <div className="mt-8 text-left">
            <MinimalFaqAccordion items={teaserFaqs} defaultOpenFirst={false} />
          </div>

          <div className="mt-6">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#D4AF37] hover:underline"
            >
              Read all FAQs
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Sleek 4-Column Dark Athletic Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Brand + Socials + Trial Pass */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/rox-logo.png"
                alt={`${CLUB.name} — ${CLUB.cultureLine}`}
                width={84}
                height={56}
                className="h-11 w-auto object-contain"
              />
              <div>
                <p className="font-display-rox text-xl tracking-tight text-[#F6F7F2]">
                  ROX <span className="text-[#00E599]">BOXING</span>
                </p>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#94A3B8]">
                  FULL-RING GYM · EST. {CLUB.foundedYear}
                </p>
              </div>
            </div>

            <p className="border-l-2 border-[#D4AF37]/60 pl-3.5 text-sm sm:text-base leading-relaxed text-[#CBD5E1]/85 max-w-sm">
              {CLUB.positioning}. 5,000 sq. ft. and a 20&apos; × 20&apos; ring in Bengaluru.
            </p>

            {/* Social Pills */}
            <div className="flex flex-wrap gap-2">
              <a
                href={CLUB.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-slate-400/20 bg-navy-card px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#F6F7F2] hover:border-[#00E599]"
              >
                INSTAGRAM
              </a>
              <a
                href={CLUB.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-slate-400/20 bg-navy-card px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#F6F7F2] hover:border-[#00E599]"
              >
                YOUTUBE
              </a>
              <a
                href={CLUB.reputation.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-[#D4AF37]/30 bg-navy-card px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#D4AF37] hover:border-[#D4AF37]"
              >
                {CLUB.reputation.ratingText} REVIEWS
              </a>
            </div>

            {/* Inline Email Pass */}
            <div className="pt-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#00E599] mb-2">
                GET YOUR FREE TRIAL PASS
              </p>
              {submitted ? (
                <div className="flex items-center gap-2 rounded-xl border border-[#00E599]/30 bg-navy-card px-4 py-3 text-xs text-[#00E599]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Pass details queued. Confirm your slot via WhatsApp anytime.</span>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} noValidate className="space-y-2 max-w-sm">
                  <input
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <label htmlFor="footer-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="min-h-[42px] flex-1 rounded-lg border border-slate-400/20 bg-navy-card px-3.5 text-xs text-[#F6F7F2] placeholder:text-[#94A3B8]/60 focus:border-[#D4AF37] focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gold-grad min-h-[42px] rounded-lg px-4 font-mono text-[11px] font-bold uppercase tracking-wider text-[#050507] transition-all hover:brightness-110 disabled:opacity-60"
                    >
                      {loading ? '...' : 'Get Pass'}
                    </button>
                  </div>
                  {error ? (
                    <p role="alert" className="text-xs text-[#ff6b6b]">
                      {error}
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
              NAVIGATION
            </p>
            <ul className="space-y-2.5 text-sm text-[#F6F7F2]/80">
              <li>
                <Link to="/" className="hover:text-[#00E599] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-[#00E599] transition-colors">
                  Programs &amp; Pricing
                </Link>
              </li>
              <li>
                <Link to="/coaches" className="hover:text-[#00E599] transition-colors">
                  Coaches
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-[#00E599] transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#00E599] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/book-trial" className="text-[#D4AF37] hover:underline">
                  Book Free Trial
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
              PROGRAMS
            </p>
            <ul className="space-y-2.5 text-sm text-[#F6F7F2]/80">
              {PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <Link
                    to="/programs"
                    className="hover:text-[#00E599] transition-colors"
                  >
                    {prog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Bengaluru Branches Cards */}
          <div className="lg:col-span-4 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
              BENGALURU BRANCHES
            </p>
            <div className="space-y-3">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="rounded-xl border border-slate-400/15 bg-navy-card p-4 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display-rox text-sm tracking-wide text-[#F6F7F2]">
                      {loc.name.toUpperCase()} BRANCH
                    </h3>
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#00E599] hover:underline"
                    >
                      MAPS
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>

                  <p className="text-sm leading-relaxed text-[#CBD5E1]/85">
                    {loc.address}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 font-mono text-xs">
                    <a
                      href={`tel:+91${CLUB.contact.phones[0]}`}
                      onClick={() =>
                        trackEvent('call_click', { phone: CLUB.contact.phonesFormatted[0] })
                      }
                      className="text-[#D4AF37] hover:underline"
                    >
                      {CLUB.contact.phonesFormatted[0]}
                    </a>
                    <a
                      href={CLUB.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('whatsapp_click', { source: 'footer_branch' })}
                      className="inline-flex items-center gap-1 text-[#00E599] hover:underline"
                    >
                      <MessageCircle className="h-3 w-3" aria-hidden="true" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Oversized Watermark & Hebrew Tagline */}
        <div className="mt-14 border-t border-slate-400/15 pt-8">
          <p
            aria-hidden="true"
            className="font-display-rox w-full select-none text-center text-[14vw] sm:text-[12vw] leading-[0.84] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-slate-200/15 via-slate-400/5 to-transparent"
          >
            ROX BOXING
          </p>

          {/* Centered Hebrew Tagline at the very end of the website */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-slate-400/10 pt-6 text-center">
            <p
              dir="rtl"
              lang="he"
              title="Sweat, Blood & Glory"
              className="text-gold-grad text-xl sm:text-2xl font-semibold tracking-wide"
            >
              זיעה, דם ותהילה
            </p>
            <span className="font-mono text-[11px] text-[#94A3B8]">
              © {new Date().getFullYear()} {CLUB.name} · Est. April 10, {CLUB.foundedYear} · KABA Affiliated
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
