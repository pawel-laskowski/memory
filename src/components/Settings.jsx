import { useContext } from 'react';
import { SettingsContext } from '../store/settings-context';
import { Modal } from '../UI/Modal';
import './Settings.css';

export const Settings = (props) => {
  const settingsCtx = useContext(SettingsContext);

  const changeThemeHandler = (theme) => {
    settingsCtx.changeTheme(theme);
    console.log(theme);
  };

  const changeDifficultyLevelHandler = (e) => {
    settingsCtx.changeDifficultyLevel(e.target.value);
  };

  const startGame = () => {
    props.startGameHandler();
    props.closeSettingsHandler();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="container">
        <p>Theme:</p>
        <div className="settings--options">
          <button
            className={settingsCtx.theme === 'pokemon' ? 'active' : ''}
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
            className={settingsCtx.theme === 'rickAndMorty' ? 'active' : ''}
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
            className={settingsCtx.theme === 'kitties' ? 'active' : ''}
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
        <div className="settings--options">
          <button
            className={
              settingsCtx.difficultyLevel === 'childish' ? 'active' : ''
            }
            onClick={changeDifficultyLevelHandler}
            value="childish"
          >
            Childish
          </button>
          <button
            className={settingsCtx.difficultyLevel === 'normal' ? 'active' : ''}
            onClick={changeDifficultyLevelHandler}
            value="normal"
          >
            Normal
          </button>
          <button
            className={settingsCtx.difficultyLevel === 'insane' ? 'active' : ''}
            onClick={changeDifficultyLevelHandler}
            value="insane"
          >
            Insane
          </button>
        </div>
        <button className="settings--confirm" onClick={startGame}>
          Start Game!
        </button>
      </div>
    </Modal>
  );
};
