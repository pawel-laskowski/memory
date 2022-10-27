import React, { useReducer } from 'react';

const defaultSettingsState = {
  theme: '',
  difficultyLevel: 0,
};

export const SettingsContext = React.createContext({
  theme: '',
  difficultyLevel: 0,
  changeTheme: (theme) => {},
  changeDifficultyLevel: (difficultyLevel) => {},
});

const settingsReducer = (state, action) => {
  if (action.type === 'THEME') {
    return { theme: action.theme, difficultyLevel: state.difficultyLevel };
  }
  if (action.type === 'LEVEL') {
    return { difficultyLevel: action.difficultyLevel, theme: state.theme };
  }

  return defaultSettingsState;
};

export const SettingsProvider = (props) => {
  const [settingsState, dispatchSettingsAction] = useReducer(
    settingsReducer,
    defaultSettingsState
  );

  const changeTheme = (theme) => {
    dispatchSettingsAction({
      type: 'THEME',
      theme,
    });
  };

  const changeDifficultyLevel = (difficultyLevel) => {
    dispatchSettingsAction({
      type: 'LEVEL',
      difficultyLevel,
    });
  };

  const settingsContext = {
    theme: settingsState.theme,
    difficultyLevel: settingsState.difficultyLevel,
    changeTheme,
    changeDifficultyLevel,
  };

  return (
    <SettingsContext.Provider value={settingsContext}>
      {props.children}
    </SettingsContext.Provider>
  );
};
