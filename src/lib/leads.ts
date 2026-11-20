import { CLUB } from '@/data/club';
import { supabase } from './supabase';

export interface TrialBookingPayload {
  name: string;
  phone: string;
  email?: string;
  dayType: 'Weekday' | 'Weekend';
  timeSlot: string;
  sessionType: string;
  location: 'HSR Extension' | 'Electronic City';
  sourcePage: string;
  honeypot?: string;
}

export interface LeadSubmissionResult {
  savedToDatabase: boolean;
  whatsappUrl: string;
  errorMessage?: string;
}

export function buildWhatsAppBookingUrl(payload: TrialBookingPayload): string {
  const lines = [
    `Hi Rox Boxing Gym, I'd like to book a session:`,
    `• Name: ${payload.name}`,
    `• Phone: +91 ${payload.phone}`,
    payload.email ? `• Email: ${payload.email}` : null,
    `• Location: ${payload.location}`,
    `• Program: ${payload.sessionType}`,
    `• Preferred Day: ${payload.dayType}`,
    `• Time Slot: ${payload.timeSlot}`,
  ].filter(Boolean);

  return `https://wa.me/${CLUB.contact.primaryWhatsAppNumber}?text=${encodeURIComponent(
    lines.join('\n')
  )}`;
}

export async function submitTrialBooking(
  payload: TrialBookingPayload
): Promise<LeadSubmissionResult> {
  const whatsappUrl = buildWhatsAppBookingUrl(payload);

  // Silent honeypot drop
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return { savedToDatabase: false, whatsappUrl };
  }

  if (!supabase) {
    return {
      savedToDatabase: false,
      whatsappUrl,
    };
  }

  try {
    const { error } = await supabase.from('trial_bookings').insert({
      name: payload.name.trim(),
      phone: `+91${payload.phone.replace(/\D/g, '')}`,
      email: payload.email?.trim() || null,
      day_type: payload.dayType,
      time_slot: payload.timeSlot,
      session_type: payload.sessionType,
      location: payload.location,
      source_page: payload.sourcePage,
    });

    if (error) {
      return {
        savedToDatabase: false,
        whatsappUrl,
        errorMessage: error.message,
      };
    }

    return {
      savedToDatabase: true,
      whatsappUrl,
    };
  } catch (err) {
    return {
      savedToDatabase: false,
      whatsappUrl,
      errorMessage: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

export async function submitEmailSignup(
  email: string,
  source: string,
  honeypot?: string
): Promise<{ saved: boolean; errorMessage?: string }> {
  if (honeypot && honeypot.trim().length > 0) {
    return { saved: true };
  }

  if (!supabase) {
    return { saved: true };
  }

  try {
    const { error } = await supabase.from('email_signups').insert({
      email: email.trim().toLowerCase(),
      source,
    });

    if (error) {
      // Unique constraint (already subscribed) treated gracefully
      if (error.code === '23505') {
        return { saved: true };
      }
      return { saved: false, errorMessage: error.message };
    }

    return { saved: true };
  } catch (err) {
    return {
      saved: false,
      errorMessage: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
