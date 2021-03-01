import { GameTypes, IntervalType, GameConfigurationsType, GameOption } from "./type";

const GAME_TYPES: GameTypes = {
  intervals: {
    title: 'Intervals',
  },
  chords: {
    title: 'Chords',
  },
  perfectPitch: {
    title: 'Perfect Pitch',
  },
};

const INTERVAL_TYPES: IntervalType[] = [
  {
    title: 'Ascending',
    value: 'ascending',
  },
  {
    title: 'Descending',
    value: 'descending',
  },
  {
    title: 'Harmonious',
    value: 'harmonious',
  },
];

const INTERVALS: GameOption[] = [
  {
    title: 'Minor Second',
    value: 'm2',
    meta: {
      difference: 1,
    },
  },
  {
    title: 'Major Second',
    value: 'M2',
    meta: {
      difference: 2,
    },
  },
  {
    title: 'Minor Third',
    value: 'm3',
    meta: {
      difference: 3,
    },
  },
  {
    title: 'Major Third',
    value: 'M3',
    meta: {
      difference: 4,
    },
  },
  {
    title: 'Perfect Fourth',
    value: 'P4',
    meta: {
      difference: 5,
    },
  },
  {
    title: 'Tritone',
    value: 'TT',
    meta: {
      difference: 6,
    },
  },
  {
    title: 'Perfect Fifth',
    value: 'P5',
    meta: {
      difference: 7,
    },
  },
  {
    title: 'Minor Sixth',
    value: 'm6',
    meta: {
      difference: 8,
    },
  },
  {
    title: 'Major Sixth',
    value: 'M6',
    meta: {
      difference: 9,
    },
  },
  {
    title: 'Minor Seventh',
    value: 'm7',
    meta: {
      difference: 10,
    },
  },
  {
    title: 'Major Seventh',
    value: 'M7',
    meta: {
      difference: 11,
    },
  },
  {
    title: 'Octave',
    value: 'P8',
    meta: {
      difference: 12,
    },
  },
];

const NOTES = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'];

const INTERVAL_GROUPS = [
  {
    title: 'Simple (M3, P5, P8)',
    value: 'simple',
    intervals: ['M3', 'P5', 'P8'],
  },
  {
    title: 'Diatonic (M2, M3, P4, P5, M6, M7, P8)',
    value: 'diatonic',
    intervals: ['M2', 'M3', 'P4', 'P5', 'M6', 'M7', 'P8'],
  },
  {
    title: 'All',
    value: 'all',
    intervals: ['m2', 'M2', 'm3', 'M3', 'P4', 'TT', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'],
  },
];

const GAME_CONFIGURATIONS: GameConfigurationsType = {
  intervals: {
    intervalGroup: {
      title: 'Intervals',
      data: INTERVAL_GROUPS,
      formType: 'select',
    },
    questionCount: {
      title: 'Questions',
      formType: 'number',
      placeholder: 'Select question number (Write 0 for endless)',
    },
    intervalTypes: {
      title: 'Interval Type',
      data: INTERVAL_TYPES,
      formType: 'comboBox',
    },
  },
  chords: {},
  perfectPitch: {},
};

export {
  GAME_TYPES,
  GAME_CONFIGURATIONS,
  NOTES,
  INTERVALS,
  INTERVAL_TYPES,
  INTERVAL_GROUPS,
};
