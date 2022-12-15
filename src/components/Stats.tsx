import { useContext, useEffect, useState } from 'react';
import { formatTime } from '../helpers/time-format';
import { SettingsContext } from '../store/settings-context';
import { WinnerForm } from './WinnerForm';
import dayjs from 'dayjs';

import './Stats.css';

type StatsPropsType = {
  turns: number;
  startTime: number;
  gameFinished: boolean;
  closeGameHandler: () => void;
};

export const Stats = (props: StatsPropsType) => {
  const [gameTime, setGameTime] = useState(0);
  const settingsCtx = useContext(SettingsContext);
  const [openWinnerForm, setOpenWinnerForm] = useState(false);

  const closeHandler = () => {
    setOpenWinnerForm(false);
    props.closeGameHandler();
  };

  const getTime = () => {
    const now = dayjs().valueOf();
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
    <div className="stats">
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
