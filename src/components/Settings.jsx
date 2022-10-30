import { useContext } from 'react';
import { SettingsContext } from '../store/settings-context';
import { Modal } from './Modal';
import './Settings.css';

export const Settings = (props) => {
  const settingsCtx = useContext(SettingsContext);

  const changeThemeHandler = (e) => {
    settingsCtx.changeTheme(e.target.value);
  };

  const changeDifficultyLevelHandler = (e) => {
    settingsCtx.changeDifficultyLevel(e.target.value);
  };

  return (
    <Modal onClose={props.onClose}>
      <div>
        <p>Theme:</p>
        <button onClick={changeThemeHandler} value="pokemon">
          <img
            className="theme-picture"
            src={'/images/pokemon.png'}
            alt="pokemon"
            value="pokemon"
          />
        </button>
        <button onClick={changeThemeHandler} value="rickAndMorty">
          <img
            className="theme-picture"
            src={'/images/rickAndMorty.png'}
            alt="rick-and-morty"
            value="rickAndMorty"
          />
        </button>
        <button onClick={changeThemeHandler} value="kitties">
          <img
            className="theme-picture"
            src={'/images/kitties.png'}
            alt="kitties"
            value="kitties"
          />
        </button>
      </div>
      <div>
        <p>Difficulty level:</p>
        <button onClick={changeDifficultyLevelHandler} value="childish">
          Childish
        </button>
        <button onClick={changeDifficultyLevelHandler} value="normal">
          Normal
        </button>
        <button onClick={changeDifficultyLevelHandler} value="insane">
          Insane
        </button>
      </div>
      <button onClick={props.shuffleCards}>Start Game!</button>
    </Modal>
  );
};
