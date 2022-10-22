import { MAP_TYPES } from "../../utilities/utilities";
import RecordEntry from "../record-entry";
import { MapRecordsOptions } from "./types";

class MapRecords {
  private options: MapRecordsOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $tableBody: JQuery<HTMLElement>;
  private recordEntries: Array<RecordEntry>;

  static compareMapEntries(a: RecordEntry, b: RecordEntry) {
    const rankComparison = a.getOptions().rank - b.getOptions().rank;

    if (rankComparison !== 0)
      return rankComparison;

    const mapTypeA = a.getOptions().category;
    const mapTypeB = b.getOptions().category;

    const mapTypeComparion = MAP_TYPES.indexOf(mapTypeA) - MAP_TYPES.indexOf(mapTypeB);

    if (mapTypeComparion !== 0)
      return mapTypeComparion;

    return 0;
  }

  constructor($parent: JQuery<HTMLElement>, options: MapRecordsOptions) {
    this.options = options;
    this.className = "map-records";
    this.$component = $parent.find(`.js-${this.className}`);
    this.$tableBody = this.$component.find(`.js-${this.className}__table-body`);

    this.recordEntries = [];
    this.options.records.forEach(entry => {
      if (entry.category === this.options.sortBy || this.options.sortBy === "Total") {
        this.recordEntries.push(new RecordEntry({
          record: entry,
        }));
      }
    });

    this.sortRecordEntries();
  }

  public getRecordEntries() {
    return this.recordEntries;
  }

  public render(recordEntries: Array<RecordEntry>) {
    this.$tableBody.empty();
    
    recordEntries.forEach(entry => {
      const $entry = entry.getHtml();
      this.$tableBody.append($entry);
    })
  }

  private sortRecordEntries() {
    this.recordEntries.sort(MapRecords.compareMapEntries);
  }
}

export default MapRecords;