export interface IntervalType {
  title: string;
  value: string;
};

const gameType = ['INTERVALS', 'CHORDS', 'PERFECT_PITCH'] as const;
export type GameType = typeof gameType[number];