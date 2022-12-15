import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatTime = (timestamp: number) => {
  const gameDuration = dayjs.duration(timestamp);
  const { hours, minutes, seconds } = gameDuration.$d;
  const formatValue = (value: number) => (value < 10 ? '0' + value : value);

  let timeString;

  timeString = formatValue(seconds) + ' second' + (seconds === 1 ? '' : 's');

  if (minutes > 0) {
    timeString =
      formatValue(minutes) +
      ' minute' +
      (minutes === 1 ? ' ' : 's ') +
      timeString;
  }

  if (hours > 0) {
    timeString =
      formatValue(hours) + ' hour' + (hours === 1 ? ' ' : 's ') + timeString;
  }

  return timeString;
};

export const formatTimeShort = (timestamp: number) => {
  const gameDuration = dayjs.duration(timestamp);
  const timeString = gameDuration.format('HH:mm:ss');

  return timeString;
};
