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

const defaultSettingsState: SettingsTypes = {
  theme: Theme.NONE,
  difficultyLevel: Level.NONE,
};

type SettingsContextTypes = {
  theme: Theme;
  difficultyLevel: Level;
  changeTheme: (theme: Theme) => void;
  changeDifficultyLevel: (difficultyLevel: Level) => void;
};

interface ActionTheme {
  type: 'THEME';
  theme: Theme;
}

interface ActionLevel {
  type: 'LEVEL';
  difficultyLevel: Level;
}

type SettingsReducerActionTypes = ActionTheme | ActionLevel;

type SettingsProviderPropsType = {
  children: React.ReactElement;
};

export const SettingsContext = React.createContext<SettingsContextTypes>({
  theme: Theme.NONE,
  difficultyLevel: Level.NONE,
  changeTheme: (theme) => {},
  changeDifficultyLevel: (difficultyLevel) => {},
});

const settingsReducer = (
  state: SettingsTypes,
  action: SettingsReducerActionTypes
) => {
  if (action.type === 'THEME') {
    return { theme: action.theme, difficultyLevel: state.difficultyLevel };
  } else if (action.type === 'LEVEL') {
    return { difficultyLevel: action.difficultyLevel, theme: state.theme };
  } else {
    return defaultSettingsState;
  }
};

export const SettingsProvider = (props: SettingsProviderPropsType) => {
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
