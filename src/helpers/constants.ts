import { IntervalType } from "./type";

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
  }
];

const INTERVALS = [
  {
    title: 'Minor Second',
    key: 'm2',
    difference: 1,
  },
  {
    title: 'Major Second',
    key: 'M2',
    difference: 2,
  },
  {
    title: 'Minor Third',
    key: 'm3',
    difference: 3,
  },
  {
    title: 'Major Third',
    key: 'M3',
    difference: 4,
  },
  {
    title: 'Perfect Fourth',
    key: 'P4',
    difference: 5,
  },
  {
    title: 'Tritone',
    key: 'TT',
    difference: 6,
  },
  {
    title: 'Perfect Fifth',
    key: 'P5',
    difference: 7,
  },
  {
    title: 'Minor Sixth',
    key: 'm6',
    difference: 8,
  },
  {
    title: 'Major Sixth',
    key: 'M6',
    difference: 9,
  },
  {
    title: 'Minor Seventh',
    key: 'm7',
    difference: 10,
  },
  {
    title: 'Major Seventh',
    key: 'M7',
    difference: 11,
  },
  {
    title: 'Octave',
    key: 'P8',
    difference: 12,
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

export {
  NOTES,
  INTERVALS,
  INTERVAL_TYPES,
  INTERVAL_GROUPS,
};
