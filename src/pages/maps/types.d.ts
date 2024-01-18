import { MapRecordsOptions } from '../../components/map-records/types';
import { MapRecord, MapType } from '../../types/types';

interface MapsOptions {
  sortBy: MapType;
  maps: MapRecord[];
  categoryMenu: {
    categories: MapType[];
  };
  mapRecords: MapRecordsOptions;
}
