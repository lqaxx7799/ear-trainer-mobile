export const INIT_GAME = 'INIT_GAME';
interface InitGame {
  type: typeof INIT_GAME,
  payload: any,
};

export type GameActionTypes = InitGame;

export interface GameState {
  config: object,
};
