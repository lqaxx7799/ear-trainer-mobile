import { GameState, GameActionTypes } from './type';

const defaultState: GameState = {
  type: null,
  config: {},
};

const gameReducer = (state = defaultState, action: GameActionTypes) => {
  switch (action.type) {
    case 'GAME_TYPE_UPDATED':
      return {
        ...state,
        type: action.payload.type,
        config: action.payload.config,
      };
    case 'GAME_CONFIGURATION_UPDATED':
      return {
        ...state,
        config: action.payload,
      };
    default:
      return state;
  }
}

export default gameReducer;