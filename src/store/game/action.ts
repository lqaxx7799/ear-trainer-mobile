import { Dispatch } from 'redux';
import _ from 'lodash';
import { GameType } from '../../helpers/type';
import { GameActionTypes } from './type';
import { GAME_CONFIGURATIONS } from '../../helpers/constants';
import { RootState } from '../../store';

function setGameType(type: GameType) {
  return (dispatch: Dispatch) => {
    const defaultConfig = _.mapValues(GAME_CONFIGURATIONS[type], config => {
      switch (config.formType) {
        case 'select':
          return config.data && config.data[0].value;
        case 'comboBox':
          return [];
        case 'number':
          return 0;
      }
    });

    dispatch<GameActionTypes> ({
      type: 'GAME_TYPE_UPDATED',
      payload: {
        type,
        config: defaultConfig,
      },
    });
  }
}

function editGameConfig(configKey: string, newValues: any) {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const { config } = state.gameReducer;

    dispatch<GameActionTypes> ({
      type: 'GAME_CONFIGURATION_UPDATED',
      payload: {
        ...config,
        [configKey]: newValues,
      },
    });
  }
}

export default {
  setGameType,
  editGameConfig,
};