import { MapRecordsOptions } from '../../components/map-records/types';
import { MapType } from '../../types/types';

interface RecordsOptions {
  mapRecords: MapRecordsOptions;
  sortBy: MapType;
  categoryMenu: {
    categories: Array<MapType>;
  };
}
