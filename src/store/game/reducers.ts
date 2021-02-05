import { GameState, GameActionTypes } from './type';

const defaultState: GameState = {
  config: {},
};

const gameReducer = (state = defaultState, action: GameActionTypes) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default gameReducer;