import moment from 'moment';
import { useEffect, useState } from 'react';

export const Stats = (props) => {
  const [gameTime, setGameTime] = useState('');

  const getTime = () => {
    const now = moment().valueOf();
    const gameDuration = moment.duration(now - props.startTime);
    let gameTimeString;
    if (gameDuration._data.hours > 1) {
      gameTimeString = `${gameDuration._data.hours}:${gameDuration._data.minutes}:${gameDuration._data.seconds}`;
    } else {
      gameTimeString = `${gameDuration._data.minutes}:${gameDuration._data.seconds}`;
    }
    setGameTime(gameTimeString);
  };

  useEffect(() => {
    if (props.gameFinished) {
      getTime();
    } else {
      const interval = setInterval(() => {
        getTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [props.startTime, props.gameFinished]);

  return (
    <div>
      <p>Turns: {props.turns}</p>
      <p>Time: {gameTime}</p>
    </div>
  );
};
