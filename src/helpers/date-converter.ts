import dayjs from 'dayjs';

export const formatEpoch = (epoch: number): string => {
  return dayjs.unix(epoch).format('MMM DD YYYY, HH:mm');
}