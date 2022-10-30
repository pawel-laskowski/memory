import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../store/settings-context';
import { WinnerForm } from './WinnerForm';

export const Stats = (props) => {
  const [gameTime, setGameTime] = useState('');
  const settingsCtx = useContext(SettingsContext);
  const [openWinnerForm, setOpenWinnerForm] = useState(false);

  const closeHandler = () => {
    setOpenWinnerForm(false);
  };

  const getTime = () => {
    const now = moment().valueOf();
    const gameDuration = moment.duration(now - props.startTime);
    const { hours, minutes, seconds } = gameDuration._data;
    let gameTimeString;
    if (hours > 1) {
      gameTimeString = `${hours} hours ${minutes} minutes ${seconds} seconds`;
    } else {
      gameTimeString = `${minutes} minutes ${seconds} seconds`;
    }

    setGameTime(gameTimeString);
  };

  useEffect(() => {
    if (props.gameFinished) {
      getTime();
      setTimeout(() => {
        setOpenWinnerForm(true);
      }, 2000);
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
      <p>Game time: {gameTime}</p>
      {openWinnerForm && (
        <WinnerForm
          gameTime={gameTime}
          difficultyLevel={settingsCtx.difficultyLevel}
          turns={props.turns}
          onClose={closeHandler}
        />
      )}
    </div>
  );
};
