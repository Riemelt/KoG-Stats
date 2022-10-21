import {
  PlayerRanks,
  Rank,
  MapType
} from "../types/types";

const RANK_TYPES: Array<Rank> = ["rank 1", "rank 2", "rank 3", "rank 4", "rank 5"];
const MAP_TYPES: Array<MapType> = ["Total", "Insane", "Hard", "Main", "Easy", "Mod"];

function comparePlayersRanks(a: PlayerRanks, b: PlayerRanks, mapType: MapType, rank: number): number {
  if (rank >= RANK_TYPES.length) return 0;
  const rankType = RANK_TYPES[rank];

  if (a.categories[mapType][rankType] !== b.categories[mapType][rankType]) {
    return a.categories[mapType][rankType] - b.categories[mapType][rankType];
  }

  return comparePlayersRanks(a, b, mapType, rank + 1);
}

function comparePlayers(mapType: MapType) {
  return function(a: PlayerRanks, b: PlayerRanks) {
    return comparePlayersRanks(a, b, mapType, 0);
  }
}

export {
  RANK_TYPES,
  MAP_TYPES,
  comparePlayers,
}