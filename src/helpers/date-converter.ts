import dayjs from 'dayjs';
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';

export const formatEpoch = (epoch: number): string => {
  return dayjs.unix(epoch).format('MMM DD YYYY, HH:mm');
}

export const timeAgoShort = (createdAt: string | number | Date): string => {
  const now = new Date();
  const date =
    typeof createdAt === 'number' && createdAt < 1e12
      ? new Date(createdAt * 1000)
      : new Date(createdAt);

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