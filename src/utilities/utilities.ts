import { PlayerRanks, Rank, MapType } from '../types/types';

const RANK_TYPES: Array<Rank> = [
  'rank 1',
  'rank 2',
  'rank 3',
  'rank 4',
  'rank 5',
];
const MAP_TYPES: Array<MapType> = [
  'Total',
  'Extreme',
  'Insane',
  'Hard',
  'Main',
  'Easy',
  'Solo',
  'Mod',
];

function comparePlayersRanks(
  a: PlayerRanks,
  b: PlayerRanks,
  mapType: MapType,
  rank: number
): number {
  if (rank >= RANK_TYPES.length) return 0;
  const rankType = RANK_TYPES[rank];

  if (a.categories[mapType][rankType] !== b.categories[mapType][rankType]) {
    return a.categories[mapType][rankType] - b.categories[mapType][rankType];
  }

  return comparePlayersRanks(a, b, mapType, rank + 1);
}

function comparePlayers(mapType: MapType) {
  return function (a: PlayerRanks, b: PlayerRanks) {
    return comparePlayersRanks(a, b, mapType, 0);
  };
}

function convertTime(time: number) {
  const ms = Math.round((time * 100) % 100);
  const secCount = Math.floor(time);
  const hours = Math.floor(secCount / 3600);
  const minutes = Math.floor(secCount / 60) % 60;
  const seconds = secCount % 60;

  const result = [hours, minutes, seconds, ms]
    .map((v) => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .reduce((acc, value, index, array) => {
      const separator = index + 1 !== array.length ? ':' : '.';
      return index === 0 ? `${value}` : `${acc}${separator}${value}`;
    }, '');

  return result;
}

function buildUrlPath(path: string) {
  const newPath = location.pathname.split('/');
  newPath[newPath.length - 1] = path;
  return newPath.join('/');
}

const debounceLast = (f: Function, ms: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: unknown[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      f.call(this, ...args);
      clearTimeout(timer);
    }, ms);
  };
};

export {
  RANK_TYPES,
  MAP_TYPES,
  comparePlayers,
  comparePlayersRanks,
  convertTime,
  buildUrlPath,
  debounceLast,
};
