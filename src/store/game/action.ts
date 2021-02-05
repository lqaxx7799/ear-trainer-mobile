import { Dispatch } from 'redux';
import { GameActionTypes } from './type';

function editGameConfig() {
  return (dispatch: Dispatch) => {
    dispatch<GameActionTypes> ({
      type: 'INIT_GAME',
      payload: 'aaa',
    });
  }
}

export default {
  editGameConfig,
};