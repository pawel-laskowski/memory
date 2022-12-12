import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../store/settings-context';
import { Modal } from '../UI/Modal';
import './Settings.css';

export const Settings = (props) => {
  const [error, setError] = useState(null);
  const settingsCtx = useContext(SettingsContext);

  const changeThemeHandler = (theme) => {
    settingsCtx.changeTheme(theme);
  };

  const changeDifficultyLevelHandler = (e) => {
    settingsCtx.changeDifficultyLevel(e.target.value);
  };

  const startGame = () => {
    if (settingsCtx.theme && settingsCtx.difficultyLevel) {
      props.startGameHandler();
      props.closeSettingsHandler();
    } else {
      setError('Please select your theme and difficulty level!');
    }
  };

  useEffect(() => {
    if (settingsCtx.theme && settingsCtx.difficultyLevel) {
      setError(null);
    }
  }, [settingsCtx.theme, settingsCtx.difficultyLevel]);

  return (
    <Modal onClose={props.onClose}>
      <div className="settings-container">
        <p>Theme:</p>
        <div className="settings__options">
          <button
            className={
              'option' + (settingsCtx.theme === 'pokemon' ? ' active' : '')
            }
            onClick={() => {
              changeThemeHandler('pokemon');
            }}
          >
            <img
              className="theme-picture"
              src={'/images/pokemon.png'}
              alt="pokemon"
            />
          </button>
          <button
            className={
              'option' + (settingsCtx.theme === 'rickAndMorty' ? ' active' : '')
            }
            onClick={() => {
              changeThemeHandler('rickAndMorty');
            }}
          >
            <img
              className="theme-picture"
              src={'/images/rickAndMorty.png'}
              alt="rick-and-morty"
            />
          </button>
          <button
            className={
              'option' + (settingsCtx.theme === 'kitties' ? ' active' : '')
            }
            onClick={() => {
              changeThemeHandler('kitties');
            }}
          >
            <img
              className="theme-picture"
              src={'/images/kitties.png'}
              alt="kitties"
            />
          </button>
        </div>
        <p>Difficulty level:</p>
        <div className="settings__options">
          <button
            className={
              'option' +
              (settingsCtx.difficultyLevel === 'childish' ? ' active' : '')
            }
            onClick={changeDifficultyLevelHandler}
            value="childish"
          >
            Childish
          </button>
          <button
            className={
              'option' +
              (settingsCtx.difficultyLevel === 'normal' ? ' active' : '')
            }
            onClick={changeDifficultyLevelHandler}
            value="normal"
          >
            Normal
          </button>
          <button
            className={
              'option' +
              (settingsCtx.difficultyLevel === 'insane' ? ' active' : '')
            }
            onClick={changeDifficultyLevelHandler}
            value="insane"
          >
            Insane
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="settings__confirm" onClick={startGame}>
          Start Game!
        </button>
      </div>
    </Modal>
  );
};
