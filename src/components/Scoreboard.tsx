import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { formatTimeShort } from '../helpers/time-format';
import { Level } from '../store/settings-context';
import { Modal } from '../UI/Modal';
import { Score } from './Score';
import './Scoreboard.css';

type ScoreType = {
  difficultyLevel: string;
  gameTime: number;
  name: string;
  turns: number;
};

export type ScoreForDisplayType = {
  rank: number;
  name: string;
  time: string;
  turns: string;
};

type ScoreboardPropsType = {
  onClose: () => void;
};

type ScoreResponseType = {
  key: ScoreType;
};

export const Scoreboard = (props: ScoreboardPropsType) => {
  const { isLoading, error, data } = useQuery<ScoreResponseType>('scores', () =>
    fetch(import.meta.env.VITE_FIREBASE_URL).then((res) => res.json())
  );
  const [scores, setScores] = useState<ScoreType[]>([]);
  const [levelFilter, setLevelFilter] = useState(Level.CHILDISH);
  const [scoresForDisplay, setScoresForDisplay] = useState<
    ScoreForDisplayType[]
  >([]);

  const prepareScoresForDisplay = () => {
    const scoresByLevel = scores
      .filter((score) => score.difficultyLevel === levelFilter)
      .sort((a, b) => (a.gameTime > b.gameTime ? 1 : -1));
    const preparedScores: ScoreForDisplayType[] = [];

    for (let index = 0; index < 10; index++) {
      preparedScores.push({
        rank: index + 1,
        name: scoresByLevel[index] ? scoresByLevel[index].name : '-',
        time: scoresByLevel[index]
          ? formatTimeShort(scoresByLevel[index].gameTime)
          : '-',
        turns: scoresByLevel[index]
          ? scoresByLevel[index].turns.toString()
          : '-',
      });
    }

    setScoresForDisplay(preparedScores);
  };

  useEffect(() => {
    prepareScoresForDisplay();
  }, [levelFilter, scores]);

  useEffect(() => {
    if (data) {
      const fetchedScores: ScoreType[] = [];

      for (const [key, value] of Object.entries(data)) {
        fetchedScores.push(value);
      }
      setScores(fetchedScores);
    }
  }, [data]);

  return (
    <Modal onClose={props.onClose}>
      <>
        <h1>Best players</h1>
        <div className="scoreboard__levels">
          <span
            className={
              'scoreboard__level' +
              (levelFilter === 'childish' ? ' scoreboard__level--active' : '')
            }
            onClick={() => setLevelFilter(Level.CHILDISH)}
          >
            Childish
          </span>
          <span
            className={
              'scoreboard__level' +
              (levelFilter === 'normal' ? ' scoreboard__level--active' : '')
            }
            onClick={() => setLevelFilter(Level.NORMAL)}
          >
            Normal
          </span>
          <span
            className={
              'scoreboard__level' +
              (levelFilter === 'insane' ? ' scoreboard__level--active' : '')
            }
            onClick={() => setLevelFilter(Level.INSANE)}
          >
            Insane
          </span>
        </div>
        <div className="scoreboard__columns">
          <span>RANK</span>
          <span>NAME</span>
          <span>TIME</span>
          <span>TURNS</span>
        </div>
        {isLoading && 'isLoading'}
        {error && 'error'}
        <div>
          {scoresForDisplay.map((score) => {
            return (
              <Score
                key={Math.random()}
                rank={score.rank}
                name={score.name}
                time={score.time}
                turns={score.turns}
              />
            );
          })}
        </div>
        <button className="close-button" onClick={props.onClose}>
          Close
        </button>
      </>
    </Modal>
  );
};
