import dayjs from 'dayjs';
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

export const formatEpoch = (epoch: number): string => {
  return dayjs.unix(epoch).format('MMM DD YYYY, HH:mm');
};

export const formatISODate = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'invalid date';
  return dayjs(date).format('MMM DD YYYY, HH:mm');
};

export const timeAgoShort = (createdAt: string | number | Date): string => {
  const now = new Date();
  let date: Date;

  if (createdAt instanceof Date) {
    date = createdAt;
  } else if (typeof createdAt === 'number') {
    // Nếu là epoch tính theo giây (<1e12), nhân thêm 1000
    date = createdAt < 1e12 ? new Date(createdAt * 1000) : new Date(createdAt);
  } else if (typeof createdAt === 'string') {
    // Nếu là ISO string (VD: 2025-11-05T10:30:00Z)
    const parsed = new Date(createdAt);
    if (isNaN(parsed.getTime())) return 'invalid date';
    date = parsed;
  } else {
    return 'invalid date';
  }

  const diffYears = differenceInYears(now, date);
  if (diffYears >= 1) return `${diffYears}y`;

  const diffMonths = differenceInMonths(now, date);
  if (diffMonths >= 1) return `${diffMonths}M`;

  const diffWeeks = differenceInWeeks(now, date);
  if (diffWeeks >= 1) return `${diffWeeks}w`;

  const diffDays = differenceInDays(now, date);
  if (diffDays >= 1) return `${diffDays}d`;

  const diffHours = differenceInHours(now, date);
  if (diffHours >= 1) return `${diffHours}h`;

  const diffMinutes = differenceInMinutes(now, date);
  if (diffMinutes >= 1) return `${diffMinutes}m`;

  return 'just now';
};
