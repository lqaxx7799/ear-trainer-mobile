import { GameType } from "../../helpers/type";

export const GAME_TYPE_UPDATED = 'GAME_TYPE_UPDATED';
export const GAME_CONFIGURATION_UPDATED = 'GAME_CONFIGURATION_UPDATED';
export const GAME_STARTED = 'GAME_STARTED';

interface GameStarted {
  type: typeof GAME_STARTED,
  payload: {
    progress: GameStateProgress,
  }
};

interface GameTypeUpdated {
  type: typeof GAME_TYPE_UPDATED,
  payload: {
    type: GameType | null,
    config: object,
  },
};

interface GameConfigurationUpdated {
  type: typeof GAME_CONFIGURATION_UPDATED;
  payload: {
    [key: string]: any;
  };
};

export type GameActionTypes = GameTypeUpdated | GameConfigurationUpdated | GameStarted;

interface GameStateProgress {
  records?: ({
    [key: string]: any;
  } | null)[];
  answerOptions?: ({
    [key: string]: any;
  } | null)[];
  streak?: number,
};

export interface GameState {
  type: GameType | null;
  config: {
    [key: string]: any;
  };
  progress: GameStateProgress;
};
