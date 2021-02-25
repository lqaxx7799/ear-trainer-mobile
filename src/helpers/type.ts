export interface IntervalType {
  title: string;
  value: string;
};

// const gameType = ['intervals', 'chords', 'perfectPitch'] as const;
// export type GameType = typeof gameType[number];

export type GameType = 'intervals' | 'chords' | 'perfectPitch';

export type GameTypes = {
  [key in GameType]: {
    title: string;
  };
};

export interface GameConfigurationType {
  title: string;
  data?: any[];
  formType: 'select' | 'number' | 'comboBox';
};

export type GameConfigurationsType = {
  [key in GameType]: {
    [key: string]: GameConfigurationType;
  };
};
