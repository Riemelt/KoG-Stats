import { MapType } from '../../types/types';

interface CategoryMenuOptions {
  categories: Array<MapType>;
  sortBy: MapType;
  onChange?: (category: MapType) => void;
}
