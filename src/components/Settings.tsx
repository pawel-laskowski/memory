import { useContext, useEffect, useState } from 'react';
import { Level, SettingsContext, Theme } from '../store/settings-context';
import { Modal } from '../UI/Modal';
import './Settings.css';

type SettingsPropsType = {
  onClose: () => void;
  startGameHandler: () => void;
  closeSettingsHandler: () => void;
};

export const Settings = (props: SettingsPropsType) => {
  const [error, setError] = useState<null | string>(null);
  const settingsCtx = useContext(SettingsContext);

  const changeThemeHandler = (theme: Theme) => {
    settingsCtx.changeTheme(theme);
  };

  const changeDifficultyLevelHandler = (level: Level) => {
    settingsCtx.changeDifficultyLevel(level);
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
              changeThemeHandler(Theme.POKEMON);
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
              changeThemeHandler(Theme.RICKANDMONTY);
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
              changeThemeHandler(Theme.KITTIES);
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
            onClick={() => {
              changeDifficultyLevelHandler(Level.CHILDISH);
            }}
          >
            Childish
          </button>
          <button
            className={
              'option' +
              (settingsCtx.difficultyLevel === 'normal' ? ' active' : '')
            }
            onClick={() => {
              changeDifficultyLevelHandler(Level.NORMAL);
            }}
          >
            Normal
          </button>
          <button
            className={
              'option' +
              (settingsCtx.difficultyLevel === 'insane' ? ' active' : '')
            }
            onClick={() => {
              changeDifficultyLevelHandler(Level.INSANE);
            }}
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
