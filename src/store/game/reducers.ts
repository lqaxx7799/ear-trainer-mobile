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
        type: action.payload,
      };
    default:
      return state;
  }
}

export default gameReducer;