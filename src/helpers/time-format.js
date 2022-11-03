import moment from 'moment';

export const formatTime = (timestamp) => {
  const gameDuration = moment.duration(timestamp);
  const { hours, minutes, seconds } = gameDuration._data;
  const formatValue = (value) => (value < 10 ? '0' + value : value);

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
