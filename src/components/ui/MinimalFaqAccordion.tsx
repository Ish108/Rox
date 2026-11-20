import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/data/faqs';

interface MinimalFaqAccordionProps {
  items: FaqItem[];
  defaultOpenFirst?: boolean;
}

export const MinimalFaqAccordion: React.FC<MinimalFaqAccordionProps> = ({
  items,
  defaultOpenFirst = false,
}) => {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenFirst ? (items[0]?.id ?? null) : null
  );
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-2xl space-y-2.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-xl border transition-colors ${
              isOpen
                ? 'border-[#00E599]/35 bg-[#0A0C12]'
                : 'border-white/[0.08] bg-[#08090D] hover:border-white/[0.16]'
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              id={`faq-btn-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-[15px] font-medium text-[#F6F7F2] transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#00E599]' : 'text-[#94A3B8]'
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-white/[0.06] px-5 py-4 text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
