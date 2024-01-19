import { MapRecord } from '../../types/types';

interface MapRecordsOptions {
  records: Array<MapRecord>;
  withPlayers?: boolean;
  withDate?: boolean;
  shouldSort?: boolean;
  isMapsPage?: boolean;
}
