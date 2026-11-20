import { LOCATIONS } from '@/data/club';

export interface GymStatus {
  isLive: boolean;
  label: string;
}

/**
 * Computes the live gym status pill in Asia/Kolkata (IST) from HSR Extension's verified batch timings.
 */
export function getGymStatusIST(now: Date = new Date()): GymStatus {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0') % 24;
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  const currentMin = hour * 60 + minute;

  const isWeekend = weekday === 'Sat' || weekday === 'Sun';
  const hsr = LOCATIONS[0];
  const todaySchedule = hsr.batches.find(
    (b) => b.days === (isWeekend ? 'Sat–Sun' : 'Mon–Fri')
  );

  if (todaySchedule) {
    for (const win of todaySchedule.windows) {
      if (currentMin >= win.startMin && currentMin < win.endMin) {
        return {
          isLive: true,
          label: 'OPEN GYM • BATCH IN SESSION',
        };
      }
    }

    const nextToday = todaySchedule.windows.find((win) => win.startMin > currentMin);
    if (nextToday) {
      return {
        isLive: false,
        label: `NEXT BATCH • ${nextToday.label} TODAY`,
      };
    }
  }

  // Next batch is tomorrow morning
  const tomorrowIsWeekend =
    (weekday === 'Fri' && true) || (weekday === 'Sat' && true);
  const tomorrowSchedule = hsr.batches.find(
    (b) => b.days === (tomorrowIsWeekend ? 'Sat–Sun' : 'Mon–Fri')
  );
  const firstTomorrow = tomorrowSchedule?.windows[0]?.label ?? '6:00 AM';

  return {
    isLive: false,
    label: `NEXT BATCH • ${firstTomorrow} TOMORROW`,
  };
}
