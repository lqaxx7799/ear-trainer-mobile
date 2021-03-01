import { GameState, GameActionTypes } from './type';

const defaultState: GameState = {
  type: null,
  config: {},
  progress: {},
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
    case 'GAME_STARTED':
      return {
        ...state,
        progress: action.payload.progress,
      };
    case 'GAME_QUESTION_ANSWERED':
      return {
        ...state,
        progress: {
          ...state.progress,
          records: action.payload.records,
          streak: action.payload.streak,
        },
      };
    case 'GAME_NEXT_QUESTION':
      return {
        ...state,
        progress: {
          ...state.progress,
          records: state.progress.records ? [
            ...state.progress.records,
            action.payload.question,
          ] : [action.payload.question],
        },
      };
    default:
      return state;
  }
}

export default gameReducer;