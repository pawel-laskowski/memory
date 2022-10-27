import { useContext } from 'react';
import { SettingsContext } from '../store/settings-context';

export const SettingsModal = () => {
  const settingsCtx = useContext(SettingsContext);

  const changeThemeHandler = (e) => {
    settingsCtx.changeTheme(e.target.id);
  };

  const changeDifficultyLevelHandler = (e) => {
    settingsCtx.changeDifficultyLevel(e.target.id);
  };

  return (
    <div style={{ border: 'solid 1px ', margin: '5px' }}>
      <div>
        <p>Theme</p>
        <button onClick={changeThemeHandler} id="pokemon">
          Pokemon
        </button>
        <button onClick={changeThemeHandler} id="rickAndMorty">
          Rick
        </button>
        <button onClick={changeThemeHandler} id="kitties">
          Kitties
        </button>
      </div>
      <div>
        <p>Difficulty level</p>
        <button onClick={changeDifficultyLevelHandler} id={3}>
          Childish
        </button>
        <button onClick={changeDifficultyLevelHandler} id={8}>
          Normal
        </button>
        <button onClick={changeDifficultyLevelHandler} id={20}>
          Insane
        </button>
      </div>
    </div>
  );
};
