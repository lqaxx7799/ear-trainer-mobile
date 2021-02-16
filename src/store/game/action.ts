import { Dispatch } from 'redux';
import { GameType } from '../../helpers/type';
import { GameActionTypes } from './type';

function setGameType(type: GameType) {
  return (dispatch: Dispatch) => {
    dispatch<GameActionTypes> ({
      type: 'GAME_TYPE_UPDATED',
      payload: type,
    });
  }
}

function editGameConfig() {
  return (dispatch: Dispatch) => {
    dispatch<GameActionTypes> ({
      type: 'GAME_CONFIGURATION_UPDATED',
      payload: 'aaa',
    });
  }
}

export default {
  setGameType,
  editGameConfig,
};