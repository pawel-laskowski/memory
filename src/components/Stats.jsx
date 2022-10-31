import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { formatTime } from '../helpers/time-format';
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
    setGameTime(now - props.startTime);
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
      <p>Game time: {formatTime(gameTime)}</p>
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
