export type AnalyticsEvent =
  | 'book_trial_open'
  | 'book_trial_submit'
  | 'whatsapp_click'
  | 'call_click'
  | 'email_signup';

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

let initialized = false;

export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const enablePlausible = import.meta.env.VITE_ENABLE_PLAUSIBLE === 'true';
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN || 'roxboxing.com';

  if (enablePlausible && !document.querySelector('script[data-domain]')) {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = plausibleDomain;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
  }

  const enableGa4 = import.meta.env.VITE_ENABLE_GA4 === 'true';
  const ga4Id = import.meta.env.VITE_GA4_ID;

  if (enableGa4 && ga4Id && !document.querySelector(`script[src*="${ga4Id}"]`)) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga4Id);
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  props?: Record<string, string>
): void {
  if (typeof window === 'undefined') return;

  if (typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined);
  }

  if (
    import.meta.env.VITE_ENABLE_GA4 === 'true' &&
    typeof window.gtag === 'function'
  ) {
    window.gtag('event', event, props ?? {});
  }
}
