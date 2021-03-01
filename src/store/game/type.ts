import { GameOption, GameType } from "../../helpers/type";

export const GAME_TYPE_UPDATED = 'GAME_TYPE_UPDATED';
export const GAME_CONFIGURATION_UPDATED = 'GAME_CONFIGURATION_UPDATED';
export const GAME_STARTED = 'GAME_STARTED';
export const GAME_QUESTION_ANSWERED = 'GAME_QUESTION_ANSWERED';
export const GAME_NEXT_QUESTION = 'GAME_NEXT_QUESTION';

interface GameStarted {
  type: typeof GAME_STARTED,
  payload: {
    progress: GameStateProgress,
  }
};

interface GameTypeUpdated {
  type: typeof GAME_TYPE_UPDATED,
  payload: {
    type: GameType | null,
    config: object,
  },
};

interface GameConfigurationUpdated {
  type: typeof GAME_CONFIGURATION_UPDATED;
  payload: {
    [key: string]: any;
  };
};

interface GameQuestionAnswered {
  type: typeof GAME_QUESTION_ANSWERED;
  payload: {
    streak: number;
    records: ({
      [key: string]: any;
    })[];
  };
};

interface GameNextQuestion {
  type: typeof GAME_NEXT_QUESTION;
  payload: {
    question: {
      [key: string]: any;
    };
  };
};

export type GameActionTypes =
  | GameTypeUpdated
  | GameConfigurationUpdated
  | GameStarted
  | GameQuestionAnswered
  | GameNextQuestion;

interface GameStateProgress {
  records?: ({
    [key: string]: any;
  })[];
  answerOptions?: (GameOption | null)[] | null;
  streak?: number,
};

export interface GameState {
  type: GameType | null;
  config: {
    [key: string]: any;
  };
  progress: GameStateProgress;
};
