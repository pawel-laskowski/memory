import { useEffect, useState } from 'react';
import { formatTime } from '../helpers/time-format';
import { Score } from './Score';
import './Scoreboard.css';

export const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [levelFilter, setLevelFilter] = useState('childish');
  const [scoresForDisplay, setScoresForDisplay] = useState([]);

  const changeLeverHandler = (e) => {
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
          ? formatTime(scoresByLevel[index].gameTime)
          : '-',
        turns: scoresByLevel[index] ? scoresByLevel[index].turns : '-',
      });
    }

    setScoresForDisplay(filteredScores);
  };

  useEffect(() => {
    filterScores();
  }, [levelFilter]);

  useEffect(() => {
    fetch(import.meta.env.VITE_FIREBASE_URL)
      .then((response) => response.json())
      .then((data) => {
        const fetchedScores = [];
        for (const [key, value] of Object.entries(data)) {
          fetchedScores.push(value);
        }
        setScores(fetchedScores);
      });
  }, []);

  return (
    <div>
      <h1>Best players</h1>
      <div>
        <span id="childish" onClick={changeLeverHandler}>
          Childish
        </span>
        <span id="medium" onClick={changeLeverHandler}>
          Medium
        </span>
        <span id="insane" onClick={changeLeverHandler}>
          Insane
        </span>
      </div>
      <div>
        <div>
          <span>RANK</span>
          <span>NAME</span>
          <span>TIME</span>
          <span>TURNS</span>
        </div>
        {scoresForDisplay.length > 0 && (
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
        )}
      </div>
    </div>
  );
};
