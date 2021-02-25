import { GameType } from "../../helpers/type";

export const INIT_GAME = 'INIT_GAME';
export const GAME_TYPE_UPDATED = 'GAME_TYPE_UPDATED';
export const GAME_CONFIGURATION_UPDATED = 'GAME_CONFIGURATION_UPDATED';

interface InitGame {
  type: typeof INIT_GAME,
  payload: any,
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

export type GameActionTypes = InitGame | GameTypeUpdated | GameConfigurationUpdated;

export interface GameState {
  type: GameType | null;
  config: {
    [key: string]: any;
  };
};
