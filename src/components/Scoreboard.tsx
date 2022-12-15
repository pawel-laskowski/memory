import { useEffect, useState } from 'react';
import { formatTimeShort } from '../helpers/time-format';
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
  rank: string;
  name: string;
  time: string;
  turns: string;
};

type ScoreboardPropsType = {
  onClose: () => void;
};

export const Scoreboard = (props: ScoreboardPropsType) => {
  const [scores, setScores] = useState<ScoreType[]>([]);
  const [levelFilter, setLevelFilter] = useState('childish');
  const [scoresForDisplay, setScoresForDisplay] = useState<
    ScoreForDisplayType[]
  >([]);

  const changeLevelHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setLevelFilter(e.target.id);
  };

  const filterScores = () => {
    const scoresByLevel = scores
      .filter((score) => score.difficultyLevel === levelFilter)
      .sort((a, b) => (a.gameTime > b.gameTime ? 1 : -1));
    const filteredScores = [];

    for (let index = 0; index < 10; index++) {
      let suffix;

      switch (index + 1) {
        case 1:
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
      }

      filteredScores.push({
        rank: index + 1 + suffix,
        name: scoresByLevel[index] ? scoresByLevel[index].name : '-',
        time: scoresByLevel[index]
          ? formatTimeShort(scoresByLevel[index].gameTime)
          : '-',
        turns: scoresByLevel[index]
          ? scoresByLevel[index].turns.toString()
          : '-',
      });
    }

    setScoresForDisplay(filteredScores);
  };

  useEffect(() => {
    filterScores();
  }, [levelFilter, scores]);

  useEffect(() => {
    fetch(import.meta.env.VITE_FIREBASE_URL)
      .then((response) => response.json())
      .then((data: { key: ScoreType }) => {
        const fetchedScores: ScoreType[] = [];

        for (const [key, value] of Object.entries(data)) {
          fetchedScores.push(value);
        }
        setScores(fetchedScores);
      });
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <h1>Best players</h1>
      <div className="scoreboard">
        <div className="scoreboard__levels">
          <span
            className={
              'scoreboard__level' +
              (levelFilter === 'childish' ? ' scoreboard__level--active' : '')
            }
            id="childish"
            onClick={changeLevelHandler}
          >
            Childish
          </span>
          <span
            className={
              'scoreboard__level' +
              (levelFilter === 'normal' ? ' scoreboard__level--active' : '')
            }
            id="normal"
            onClick={changeLevelHandler}
          >
            Normal
          </span>
          <span
            className={
              'scoreboard__level' +
              (levelFilter === 'insane' ? ' scoreboard__level--active' : '')
            }
            id="insane"
            onClick={changeLevelHandler}
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
      </div>
      <button className="close-button" onClick={props.onClose}>
        Close
      </button>
    </Modal>
  );
};
