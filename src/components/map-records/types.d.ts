import { MapRecord, MapType } from "../../types/types";

interface MapRecordsOptions {
  sortBy: MapType,
  records: Array<MapRecord>;
  withPlayers?: boolean;
}