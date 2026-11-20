import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, MessageCircle, ArrowRight, Loader2 } from 'lucide-react';
import { CLUB, TIME_SLOTS } from '@/data/club';
import { submitTrialBooking, buildWhatsAppBookingUrl } from '@/lib/leads';
import { trackEvent } from '@/lib/analytics';

const SESSION_TYPES = [
  'Free Trial',
  'Beginner',
  "Women's Only",
  'Juniors',
  'Advanced',
  'Private Coaching',
] as const;

const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine(
      (val) => /^[6-9]\d{9}$/.test(val),
      'Enter a valid 10-digit Indian mobile number (+91)'
    ),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .optional()
    .or(z.literal('')),
  dayType: z.enum(['Weekday', 'Weekend']),
  timeSlot: z.string().min(1, 'Select a preferred time slot'),
  sessionType: z.string().min(1, 'Select a session type'),
  location: z.enum(['HSR Extension', 'Electronic City']),
  consent: z.boolean().refine((v) => v === true, {
    message: 'Please agree to be contacted regarding your trial booking',
  }),
  honeypot: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  defaultSessionType?: string;
  defaultLocation?: 'HSR Extension' | 'Electronic City';
  sourcePage?: string;
  onSuccessClose?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  defaultSessionType = 'Free Trial',
  defaultLocation = 'HSR Extension',
  sourcePage,
}) => {
  const [submittedResult, setSubmittedResult] = useState<{
    whatsappUrl: string;
    savedToDatabase: boolean;
    name: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      dayType: 'Weekday',
      timeSlot: TIME_SLOTS.Weekday[0],
      sessionType: defaultSessionType,
      location: defaultLocation,
      consent: true,
      honeypot: '',
    },
  });

  const dayType = watch('dayType');
  const currentTimeSlot = watch('timeSlot');
  const currentValues = watch();
  const availableSlots = TIME_SLOTS[dayType];

  useEffect(() => {
    document.body.dataset.cursorLoading = isSubmitting ? 'true' : 'false';
    return () => {
      document.body.dataset.cursorLoading = 'false';
    };
  }, [isSubmitting]);

  useEffect(() => {
    if (defaultSessionType) {
      setValue('sessionType', defaultSessionType);
    }
    if (defaultLocation) {
      setValue('location', defaultLocation);
    }
  }, [defaultSessionType, defaultLocation, setValue]);

  useEffect(() => {
    if (!availableSlots.includes(currentTimeSlot as never)) {
      setValue('timeSlot', availableSlots[0]);
    }
  }, [dayType, availableSlots, currentTimeSlot, setValue]);

  const onSubmit = async (data: BookingFormValues) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      dayType: data.dayType,
      timeSlot: data.timeSlot,
      sessionType: data.sessionType,
      location: data.location,
      sourcePage: sourcePage ?? window.location.pathname,
      honeypot: data.honeypot,
    };

    const result = await submitTrialBooking(payload);

    trackEvent('book_trial_submit', {
      location: data.location,
      sessionType: data.sessionType,
      savedToDb: String(result.savedToDatabase),
    });

    // Fallback: if Supabase failed or isn't connected, open WhatsApp directly so no lead is lost
    if (!result.savedToDatabase) {
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    setSubmittedResult({
      whatsappUrl: result.whatsappUrl,
      savedToDatabase: result.savedToDatabase,
      name: data.name,
    });
  };

  const quickWhatsAppUrl = buildWhatsAppBookingUrl({
    name: currentValues.name || 'Visitor',
    phone: currentValues.phone || 'Not provided',
    email: currentValues.email || undefined,
    dayType: currentValues.dayType,
    timeSlot: currentValues.timeSlot,
    sessionType: currentValues.sessionType,
    location: currentValues.location,
    sourcePage: sourcePage ?? (typeof window !== 'undefined' ? window.location.pathname : '/'),
  });

  if (submittedResult) {
    return (
      <div className="rounded-2xl border border-[#00E599]/30 bg-[#0F1A36] p-6 space-y-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-[#00E599] mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display-rox text-2xl text-[#F4F5F7]">
              CORNER RESERVED, {submittedResult.name.toUpperCase()}
            </h3>
            <p className="mt-1 text-sm text-[#94A3B8]">
              {submittedResult.savedToDatabase
                ? 'Your booking request is logged. Tap below to confirm your slot directly on WhatsApp with the club.'
                : 'Confirm your booking directly on WhatsApp below so our coaches lock in your slot.'}
            </p>
          </div>
        </div>

        <a
          href={submittedResult.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { source: 'booking_success' })}
          className="bg-gold-grad flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#060B18] transition-all hover:brightness-110"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Confirm via WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setSubmittedResult(null)}
          className="w-full text-center font-mono text-xs uppercase tracking-wider text-[#94A3B8] hover:text-[#F4F5F7] py-2"
        >
          Book another slot
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="rox-company-field">Leave blank</label>
        <input
          id="rox-company-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      <div>
        <label htmlFor="booking-name" className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">
          Full Name *
        </label>
        <input
          id="booking-name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          {...register('name')}
          className="w-full min-h-[44px] rounded-xl border border-white/[0.12] bg-[#060B18] px-4 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#94A3B8]/60 focus:border-[#D4AF37] focus:outline-none"
        />
        {errors.name ? (
          <p role="alert" className="mt-1 text-xs text-[#ff6b6b]">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-phone" className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">
            Phone (+91) *
          </label>
          <div className="flex min-h-[44px] items-center rounded-xl border border-white/[0.12] bg-[#060B18] focus-within:border-[#D4AF37]">
            <span className="pl-3.5 pr-2 font-mono text-xs text-[#94A3B8] border-r border-white/[0.08]">
              +91
            </span>
            <input
              id="booking-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="9845504564"
              {...register('phone')}
              className="w-full bg-transparent px-3 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#94A3B8]/60 focus:outline-none"
            />
          </div>
          {errors.phone ? (
            <p role="alert" className="mt-1 text-xs text-[#ff6b6b]">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="booking-email" className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">
            Email (Optional)
          </label>
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register('email')}
            className="w-full min-h-[44px] rounded-xl border border-white/[0.12] bg-[#060B18] px-4 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#94A3B8]/60 focus:border-[#D4AF37] focus:outline-none"
          />
          {errors.email ? (
            <p role="alert" className="mt-1 text-xs text-[#ff6b6b]">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-location" className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">
            Branch *
          </label>
          <select
            id="booking-location"
            {...register('location')}
            className="w-full min-h-[44px] rounded-xl border border-white/[0.12] bg-[#060B18] px-3.5 py-2.5 text-sm text-[#F4F5F7] focus:border-[#D4AF37] focus:outline-none"
          >
            <option value="HSR Extension">HSR Extension (Main)</option>
            <option value="Electronic City">Electronic City</option>
          </select>
        </div>

        <div>
          <label htmlFor="booking-session" className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">
            Session Type *
          </label>
          <select
            id="booking-session"
            {...register('sessionType')}
            className="w-full min-h-[44px] rounded-xl border border-white/[0.12] bg-[#060B18] px-3.5 py-2.5 text-sm text-[#F4F5F7] focus:border-[#D4AF37] focus:outline-none"
          >
            {SESSION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <span className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">
            Day *
          </span>
          <div className="grid grid-cols-2 gap-2">
            {(['Weekday', 'Weekend'] as const).map((day) => {
              const active = dayType === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setValue('dayType', day)}
                  className={`min-h-[44px] rounded-xl border font-mono text-xs uppercase tracking-wider transition-colors ${
                    active
                      ? 'border-[#00E599] bg-emerald-grad text-[#060B18] font-bold'
                      : 'border-slate-400/20 bg-[#060B18] text-[#F4F5F7] hover:border-slate-400/40'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="booking-slot" className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1.5">
            Time Slot (IST) *
          </label>
          <select
            id="booking-slot"
            {...register('timeSlot')}
            className="w-full min-h-[44px] rounded-xl border border-white/[0.12] bg-[#060B18] px-3.5 py-2.5 text-sm text-[#F4F5F7] focus:border-[#D4AF37] focus:outline-none"
          >
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer pt-1">
        <input
          type="checkbox"
          {...register('consent')}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-[#060B18] accent-[#D4AF37]"
        />
        <span className="text-xs leading-relaxed text-[#94A3B8]">
          I agree to be contacted by {CLUB.name} via WhatsApp or phone to confirm my session.
        </span>
      </label>
      {errors.consent ? (
        <p role="alert" className="text-xs text-[#ff6b6b]">
          {errors.consent.message}
        </p>
      ) : null}

      <div className="pt-2 space-y-2.5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold-grad flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#060B18] transition-all hover:brightness-110 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Booking Slot...
            </>
          ) : (
            <>
              Book Free Trial (₹0)
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>

        <a
          href={quickWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { source: 'booking_drawer_direct' })}
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-[#0F1A36] px-5 py-2.5 text-xs font-medium text-[#F4F5F7] transition-colors hover:border-[#00E599]/60 hover:text-[#00E599]"
        >
          <MessageCircle className="h-4 w-4 text-[#00E599]" aria-hidden="true" />
          Confirm via WhatsApp
        </a>
      </div>
    </form>
  );
};
