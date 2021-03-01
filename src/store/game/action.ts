import { Dispatch } from 'redux';
import _ from 'lodash';
import { GameOption, GameType } from '../../helpers/type';
import { GameActionTypes } from './type';
import { GAME_CONFIGURATIONS } from '../../helpers/constants';
import { RootState } from '../../store';
import gameHelpers from './helper';

function setGameType(type: GameType) {
  return (dispatch: Dispatch) => {
    const defaultConfig = _.mapValues(GAME_CONFIGURATIONS[type], config => {
      switch (config.formType) {
        case 'select':
          return config.data && config.data[0].value;
        case 'comboBox':
          return [];
        case 'number':
          return '0';
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

function startGame() {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const { config, type } = state.gameReducer;
    const question = gameHelpers.generateQuestion(type, config);
    const answerOptions = gameHelpers.getDefaultAnsweringOptions(type, config);

    if (question) {
      dispatch<GameActionTypes> ({
        type: 'GAME_STARTED',
        payload: {
          progress: {
            records: [question],
            streak: 0,
            answerOptions,
          },
        },
      });
    }

  }
}

function answerQuestion(option: GameOption) {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    let { progress: { records, streak } } = state.gameReducer;

    const currentQuestion = _.last(records);
    if (!currentQuestion) {
      return;
    }

    const isCorrect = option.value === currentQuestion.answer;
    if (currentQuestion.isCorrect === undefined) {
      currentQuestion.isCorrect = isCorrect;

      if (isCorrect) {
        streak = streak ? streak + 1 : 1;
      } else {
        streak = 0;
      }
    }

    records = _.map(records, (record, index) => {
      if (index !== _.size(records) - 1) {
        return record;
      }
      return currentQuestion;
    });

    dispatch<GameActionTypes> ({
      type: 'GAME_QUESTION_ANSWERED',
      payload: {
        records,
        streak: streak || 0,
      },
    });

    return isCorrect;
  }
}

function goToNewQuestion() {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const { config, type } = state.gameReducer;
    const question = gameHelpers.generateQuestion(type, config);

    if (question) {
      dispatch<GameActionTypes> ({
        type: 'GAME_NEXT_QUESTION',
        payload: {
          question,
        },
      });
    }
    
  } 
}

export default {
  setGameType,
  editGameConfig,
  startGame,
  answerQuestion,
  goToNewQuestion,
};
