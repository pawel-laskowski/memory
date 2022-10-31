import { useEffect, useState } from 'react';
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
      .sort((a, b) => (a.gameTime > b.gameTime ? a : b));
    const filteredScores = [];

    for (let index = 0; index < 10; index++) {
      filteredScores.push({
        rank: index + 1,
        name: scoresByLevel[index] ? scoresByLevel[index].name : '-',
        turns: scoresByLevel[index] ? scoresByLevel[index].turns : '-',
        time: scoresByLevel[index] ? scoresByLevel[index].gameTime : '-',
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
          <span>TURNS</span>
          <span>TIME</span>
        </div>
        {scoresForDisplay.length > 0 && (
          <div>
            {scoresForDisplay.map((score) => {
              return (
                <Score
                  key={Math.random()}
                  rank={score.rank}
                  name={score.name}
                  turns={score.turns}
                  time={score.time}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
