import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'volt' | 'ghost' | 'outline';
  cursorMode?: 'book' | 'explore';
  children: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  variant = 'volt',
  cursorMode = 'book',
  className = '',
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e);
    if (prefersReducedMotion || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    setOffset({ x, y });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
    setOffset({ x: 0, y: 0 });
  };

  const variantClasses =
    variant === 'volt'
      ? 'bg-gold-grad text-[#060B18] font-semibold hover:brightness-110 shadow-[0_0_24px_rgba(212,175,55,0.22)]'
      : variant === 'outline'
        ? 'border border-slate-400/20 bg-navy-card text-[#F4F5F7] hover:border-[#00E599]/60'
        : 'border border-slate-400/20 bg-transparent text-[#F4F5F7] hover:border-[#00E599]/60 hover:text-[#00E599]';

  return (
    <button
      ref={ref}
      type="button"
      data-cursor={cursorMode}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ease, border-color 150ms ease',
      }}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-colors ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
