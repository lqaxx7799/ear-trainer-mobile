import _ from 'lodash';
import { GameType } from '../../helpers/type';
import { GAME_CONFIGURATIONS, INTERVALS, INTERVAL_GROUPS, NOTES } from '../../helpers/constants';
import utilHelpers from '../../helpers/utils';

function getAnsweringOptions(type: GameType | null, config: object) {
  switch (type) {
    case 'intervals':
      return _generateIntervalsQuestion(config);
    default:
      return null;
  }
}

function generateQuestion(type: GameType | null, config: object) {
  switch (type) {
    case 'intervals':
      return _generateIntervalsQuestion(config);
    default:
      return null;
  }
}

function _generateIntervalsQuestion(config: any) {
  const {
    intervalGroup: selectedIntervalGroup,
    intervalTypes: selectedIntervalTypes,
  } = config;
  
  const intervalGroup = _.find(INTERVAL_GROUPS, item => item.value === selectedIntervalGroup);
  if (!intervalGroup) {
    return null;
  }
  const randomInterval = _.sample(intervalGroup.intervals);
  const intervalInfo = _.find(INTERVALS, item => item.key === randomInterval);
  if (!intervalInfo) {
    return null;
  }

  const randomType = _.sample(selectedIntervalTypes);
  let firstNote, secondNote;
  if (randomType === 'ascending' || randomType === 'harmonious') {
    const firstNoteIndex = utilHelpers.getRandomInRange(0, NOTES.length - intervalInfo.difference - 1);
    firstNote = NOTES[firstNoteIndex];
    secondNote = NOTES[firstNoteIndex + intervalInfo.difference];
  } else {
    const firstNoteIndex = utilHelpers.getRandomInRange(intervalInfo.difference, NOTES.length - 1);
    firstNote = NOTES[firstNoteIndex];
    secondNote = NOTES[firstNoteIndex - intervalInfo.difference];
  }

  return {
    question: {
      type: randomType,
      notes: [firstNote, secondNote],
    },
    answer: randomInterval,
  };
}

export default {
  getAnsweringOptions,
  generateQuestion,
};