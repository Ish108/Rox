import React from 'react';

interface EditorialImageProps {
  alt: string;
  label: string;
  sublabel?: string;
  src?: string;
  aspectClass?: string;
  className?: string;
  grayscaleHover?: boolean;
  priorityBadge?: string;
}

/**
 * Monochrome duotone-to-volt editorial frame with image support, grain, and corner crop marks.
 */
export const EditorialImage: React.FC<EditorialImageProps> = ({
  alt,
  label,
  sublabel,
  src,
  aspectClass = 'aspect-[4/5]',
  className = '',
  grayscaleHover = false,
  priorityBadge,
}) => {
  return (
    <figure
      role="img"
      aria-label={alt}
      className={`group/img relative overflow-hidden bg-navy-card border border-slate-400/15 ${aspectClass} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
            grayscaleHover
              ? 'grayscale group-hover/img:grayscale-0 group-hover/img:scale-[1.03]'
              : ''
          }`}
        />
      ) : (
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            grayscaleHover
              ? 'grayscale group-hover/img:grayscale-0 group-hover/img:scale-[1.03]'
              : ''
          }`}
          style={{
            background:
              'radial-gradient(circle at 75% 20%, rgba(0,229,153,0.22), transparent 54%), radial-gradient(circle at 20% 85%, rgba(212,175,55,0.14), transparent 55%), linear-gradient(155deg, #132247 0%, #060B18 75%)',
          }}
        />
      )}

      {/* Subtle architectural ring grid lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Subtle grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Corner crop marks (Antique Gold) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-[#D4AF37]/75"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-[#D4AF37]/75"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-[#D4AF37]/75"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-[#D4AF37]/75"
      />

      {/* Center editorial frame metadata */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#94A3B8]">
            ROX ARCHIVE
          </span>
          {priorityBadge ? (
            <span className="bg-gold-grad px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-[#060B18]">
              {priorityBadge}
            </span>
          ) : null}
        </div>

        <div className="border-t border-white/10 pt-3">
          <p className="font-display-rox text-xl leading-none text-[#F4F5F7]">
            {label}
          </p>
          {sublabel ? (
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
              {sublabel}
            </p>
          ) : null}
        </div>
      </div>

      {/* Visually hidden alt text for screen readers */}
      <span className="sr-only">{alt}</span>
    </figure>
  );
};
