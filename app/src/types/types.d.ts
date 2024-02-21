type Rank = 'rank 1' | 'rank 2' | 'rank 3' | 'rank 4' | 'rank 5';
type MapType =
  | 'Easy'
  | 'Main'
  | 'Hard'
  | 'Insane'
  | 'Mod'
  | 'Solo'
  | 'Total'
  | 'Extreme';

type Category = {
  [key in Rank]: number;
};

type Categories<T = Category> = {
  [key in MapType]: T;
};

interface PlayerRanks {
  name: string;
  categories: Categories;
}

interface Finish {
  name: string;
  time: number;
  rank: number;
  date?: Date;
}

interface KoGMapEntity {
  name: string;
  category: MapType;
  releaseDate: string;
  authors: string[];
  stars: number;
  points: number;
}

interface KoGMap extends KoGMapEntity {
  topFinishes: Array<Finish>;
}

interface PlayersMapRecords {
  [key: string]: Array<MapRecord>;
}

interface MapRecord extends KoGMapEntity {
  time: number;
  rank: number;
  players?: Array<string>;
  date?: Date;
}

type HTMLElementEvent<T extends HTMLElement> = JQuery.Event & {
  target: T;
  currentTarget: T;
};

export {
  Rank,
  MapType,
  Category,
  Categories,
  PlayerRanks,
  Finish,
  KoGMapEntity,
  KoGMap,
  PlayersMapRecords,
  MapRecord,
  HTMLElementEvent,
};
