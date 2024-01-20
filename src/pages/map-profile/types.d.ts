import { MapFinishesOptions } from '../../components/map-finishes/types';
import { MapRecordsOptions } from '../../components/map-records/types';
import { MapRecord } from '../../types/types';

interface MapProfileOptions {
  mapName: string;
  mapRecord: Array<MapRecord>;
  mapProfile: MapRecordsOptions;
  mapFinishes: MapFinishesOptions;
}
