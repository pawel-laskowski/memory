import React, { useReducer } from 'react';

enum Theme {
  POKEMON = 'pokemon',
  RICKANDMONTY = 'rickAndMorty',
  KITTIES = 'kitties',
  NONE = '',
}

enum Level {
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
  difficultyLevel: number;
  changeTheme: (theme: Theme) => void;
  changeDifficultyLevel: (difficultyLevel: number) => void;
};

export const SettingsContext = React.createContext<SettingsContextTypes | null>(
  {
    theme: Theme.NONE,
    difficultyLevel: 0,
    changeTheme: (theme) => {},
    changeDifficultyLevel: (difficultyLevel) => {},
  }
);

type SettingsReducerActionTypes = {
  type: string;
  theme?: Theme;
  difficultyLevel?: number;
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

  const changeDifficultyLevel = (difficultyLevel: number) => {
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
