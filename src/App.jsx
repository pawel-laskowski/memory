import { useState } from 'react';
import { SettingsProvider } from './store/settings-context';
import { Game } from './components/Game';
import { Settings } from './components/Settings';
import { Scoreboard } from './components/Scoreboard';
import './App.css';

export const App = () => {
  const [gameIsOn, setGameIsOn] = useState(false);
  const [openScoreboard, setOpenScoreboard] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const startGameHandler = () => {
    setGameIsOn(true);
  };

  const openScoreboardHandler = () => {
    setOpenScoreboard(true);
  };

  const closeScoreboardHandler = () => {
    setOpenScoreboard(false);
  };

  const openSettingsHandler = () => {
    // warning about losing current game
    setGameIsOn(false);
    setOpenSettings(true);
  };

  const closeSettingsHandler = () => {
    setOpenSettings(false);
  };

  return (
    <SettingsProvider>
      <div className="app">
        <div className="header">
          <h1>MEMORY</h1>
          <button className="scoreboard-button" onClick={openScoreboardHandler}>
            <img src="./images/trophy.png" />
          </button>
          {openScoreboard && <Scoreboard onClose={closeScoreboardHandler} />}
        </div>
        <button onClick={openSettingsHandler}>Start New Game</button>
        {gameIsOn && <Game />}
        {openSettings && (
          <Settings
            onClose={closeSettingsHandler}
            startGameHandler={startGameHandler}
            closeSettingsHandler={closeSettingsHandler}
          />
        )}
      </div>
    </SettingsProvider>
  );
};
