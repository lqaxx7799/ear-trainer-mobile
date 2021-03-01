import _ from 'lodash';
import { GameOption, GameType } from '../../helpers/type';
import { GAME_CONFIGURATIONS, INTERVALS, INTERVAL_GROUPS, NOTES } from '../../helpers/constants';
import utilHelpers from '../../helpers/utils';

function getDefaultAnsweringOptions(
  type: GameType | null,
  config: object,
): GameOption[] | null {
  if (type === 'intervals') {
    const intervalGroup = _.get(
      _.find(
        INTERVAL_GROUPS,
        (item) => item.value === _.get(config, 'intervalGroup')
      ),
      'intervals',
    );
    return INTERVALS.filter((interval) =>
      _.find(intervalGroup, (item) => item === interval.value)
    );
  }
  return null;
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
  const intervalInfo = _.find(INTERVALS, item => item.value === randomInterval);
  if (!intervalInfo) {
    return null;
  }

  const randomType = _.sample(selectedIntervalTypes);
  let firstNote, secondNote;
  if (randomType === 'ascending' || randomType === 'harmonious') {
    const firstNoteIndex = utilHelpers.getRandomInRange(0, NOTES.length - intervalInfo.meta.difference - 1);
    firstNote = NOTES[firstNoteIndex];
    secondNote = NOTES[firstNoteIndex + intervalInfo.meta.difference];
  } else {
    const firstNoteIndex = utilHelpers.getRandomInRange(intervalInfo.meta.difference, NOTES.length - 1);
    firstNote = NOTES[firstNoteIndex];
    secondNote = NOTES[firstNoteIndex - intervalInfo.meta.difference];
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
  getDefaultAnsweringOptions,
  generateQuestion,
};