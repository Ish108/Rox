# Rox Boxing Gym — Content & Launch Verification Checklist (`CONTENT_TODO.md`)

All items below are flagged `// TODO: CONFIRM` in code and must be verified with the club owner (Ex. Capt. Rakesh S) before production launch.

---

## 1. Knowledge Base vs. VERIFIED FACTS Conflicts

1. **Pricing (3 Conflicting Sheets on Legacy Site)**
   - **File:** `src/data/pricing.ts`
   - **Conflict:** The legacy `roxboxing.com` site publishes three different INR rate tables (`/programs-pricing/`, `/programs-pricing-2/`, `/programs-pricing-2-2/`).
   - **Current Implementation:** Uses the verified baseline figures (`Free Trial: ₹0`, `Pay-Per-Session: ₹499–₹999`, `Individual Membership: from ₹3,500 / month; ₹10,750 / 6 months; ₹18,750 / 12 months`, `All-Access + Private Coaching: "Talk to us"`). No per-month equivalents or discount percentages are computed.
   - **Action:** Confirm the single active fee sheet (including PalPack and Juniors rates if they should be shown on `/programs`).
   - **Schema Note (`src/lib/schema.ts`):** `Offer` JSON-LD entries for pricing are intentionally omitted until pricing is confirmed.

2. **Weekend Trial Slot (`9:00–10:00 AM`)**
   - **File:** `src/data/club.ts` (`TIME_SLOTS.Weekend`)
   - **Conflict:** Verified batch timings state Sat–Sun morning hours are `7:00–9:00 AM`, whereas the Knowledge Base lists weekend trial slots including `9–10 AM`.
   - **Current Implementation:** Derived `TIME_SLOTS.Weekend` strictly from the verified `7:00–9:00 AM` and `6:00–8:00 PM` windows (`7:00–8:00 AM`, `8:00–9:00 AM`, `6:00–7:00 PM`, `7:00–8:00 PM`).
   - **Action:** Confirm whether a `9:00–10:00 AM` weekend slot is active.

3. **Secondary Culture Tagline**
   - **Conflict:** VERIFIED FACTS lists `"Sweat, Blood & Glory"`. The Knowledge Base also lists `"Where Every Workout Is A Knockout!"`.
   - **Current Implementation:** Uses `"Sweat, Blood & Glory"` only. Confirm if the secondary line should be added.

---

## 2. Placeholders & Unconfirmed Facts

1. **Electronic City (Rox Boxing Home Branch) Address & Timings**
   - **Files:** `src/data/club.ts`, `src/data/faqs.ts`, `src/lib/schema.ts`
   - **Placeholder:** `"Full address shared on WhatsApp"` and `"Confirm current batch timings on WhatsApp"`.
   - **Action:** Obtain exact street address, postal code, and batch timings for Electronic City and update `LOCATIONS[1]` and JSON-LD.

2. **Geo Coordinates (`latitude`, `longitude`)**
   - **File:** `src/lib/schema.ts`
   - **Status:** Omitted from JSON-LD (never invented).
   - **Action:** Add verified `GeoCoordinates` for HSR Extension and Electronic City once confirmed.

3. **Find Your Corner — Intensity Levels, Durations & Gear Copy**
   - **File:** `src/data/styles.ts`
   - **Status:** Cardio/Footwork/Power percentage bars, session durations (`60 min`, `45–60 min`, `60–90 min`), and gear requirements are editorial estimates flagged `// TODO: CONFIRM`.
   - **Action:** Confirm exact session durations and required gear per track with the coaches.

4. **Social Links & Direct Google Reviews URL**
   - **File:** `src/data/club.ts`
   - **Status:** `instagram`, `youtube`, and `googleReviewsUrl` use placeholder URLs.
   - **Action:** Replace with the club's official Instagram handle, YouTube channel, and direct Google Maps / Trustindex review link.

5. **Photography (`<EditorialImage />`)**
   - **Files:** `src/components/ui/EditorialImage.tsx`, `src/components/sections/CoachRosterSection.tsx`, `src/pages/CoachesPage.tsx`
   - **Status:** Monochrome duotone-to-volt editorial placeholders are rendered with descriptive alt text.
   - **Action:** Drop in real photography of Ex. Capt. Rakesh S, Narendra N, Sagar, Roshni, and the 20' × 20' ring.

6. **OG Image (`/public/og-placeholder.svg`)**
   - **Status:** Vector placeholder at `public/og-placeholder.svg`.
   - **Action:** Export a 1200×630 PNG/JPG branded OG image for social sharing before launch.

---

## 3. Assumptions

- **Live Status Pill (`src/lib/timings.ts`):** Assumes HSR Extension batch timings (`Mon–Fri 6:00–10:00 AM, 5:00–10:00 PM IST`; `Sat–Sun 7:00–9:00 AM, 6:00–8:00 PM IST`) represent the primary gym open status in `Asia/Kolkata`.
- **Booking Form Fallback (`src/lib/leads.ts`):** Assumes primary WhatsApp (`+91 82967 44467`) is always monitored for trial confirmations when `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are not configured or offline.
- **Prerendering (SEO/AEO/GEO):** Because Vite builds a client-side React SPA, static prerendering (e.g., `vite-plugin-prerender` or export-time prerendering of `/`, `/programs`, `/coaches`, `/locations`, `/faq`, `/book-trial`) is recommended before launch for maximum crawler coverage.
