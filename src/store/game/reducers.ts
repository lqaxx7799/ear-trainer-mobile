import { GameActionTypes } from './type';

const defaultState = {
  
};

const gameReducer = (state = defaultState, action: GameActionTypes) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default gameReducer;