import React, { useReducer } from 'react';

export enum Theme {
  POKEMON = 'pokemon',
  RICKANDMONTY = 'rickAndMorty',
  KITTIES = 'kitties',
  NONE = '',
}

export enum Level {
  CHILDISH = 'childish',
  NORMAL = 'normal',
  INSANE = 'insane',
  NONE = '',
}

type SettingsTypes = {
  theme: Theme;
  difficultyLevel: Level;
};

const defaultSettingsState = {
  theme: Theme.NONE,
  difficultyLevel: Level.NONE,
} as SettingsTypes;

type SettingsContextTypes = {
  theme: Theme;
  difficultyLevel: Level;
  changeTheme: (theme: Theme) => void;
  changeDifficultyLevel: (difficultyLevel: Level) => void;
};

export const SettingsContext = React.createContext<SettingsContextTypes>({
  theme: Theme.NONE,
  difficultyLevel: Level.NONE,
  changeTheme: (theme) => {},
  changeDifficultyLevel: (difficultyLevel) => {},
});

type SettingsReducerActionTypes = {
  type: string;
  theme?: Theme;
  difficultyLevel?: Level;
};

const settingsReducer = (state: any, action: SettingsReducerActionTypes) => {
  if (action.type === 'THEME') {
    return { theme: action.theme, difficultyLevel: state.difficultyLevel };
  }
  if (action.type === 'LEVEL') {
    return { difficultyLevel: action.difficultyLevel, theme: state.theme };
  }

  return defaultSettingsState;
};

export const SettingsProvider = (props: any) => {
  const [settingsState, dispatchSettingsAction] = useReducer(
    settingsReducer,
    defaultSettingsState
  );

  const changeTheme = (theme: Theme) => {
    dispatchSettingsAction({
      type: 'THEME',
      theme,
    });
  };

  const changeDifficultyLevel = (difficultyLevel: Level) => {
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
