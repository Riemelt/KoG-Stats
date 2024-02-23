import { KoGMap, MapType } from '../../types/types';

interface LandingOptions {
  sortBy: MapType;
  topRanks: KoGMap[];
  categoryMenu: {
    categories: Array<MapType>;
  };
}
