import { MapRecord, MapType } from "../../types/types";

interface PlayerProfileOptions {
  sortBy: MapType,
  playerName: string,
  playerRecords: Array<MapRecord>,
  categoryMenu: {
    categories: Array<MapType>
  } 
}