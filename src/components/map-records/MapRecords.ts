import { MapType } from '../../types/types';
import { MAP_TYPES } from '../../utilities/utilities';
import RecordEntry from '../record-entry';
import { MapRecordsOptions } from './types';

class MapRecords {
  private options: MapRecordsOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $tableBody: JQuery<HTMLElement>;
  private recordEntries: Array<RecordEntry>;

  static compareMapEntries(a: RecordEntry, b: RecordEntry) {
    const rankComparison = a.getOptions().rank - b.getOptions().rank;

    if (rankComparison !== 0) return rankComparison;

    const mapTypeA = a.getOptions().category;
    const mapTypeB = b.getOptions().category;

    const mapTypeComparison =
      MAP_TYPES.indexOf(mapTypeA) - MAP_TYPES.indexOf(mapTypeB);

    if (mapTypeComparison !== 0) return mapTypeComparison;

    return 0;
  }

  constructor(
    $parent: JQuery<HTMLElement>,
    { records, withPlayers = false, withDate = false }: MapRecordsOptions
  ) {
    this.options = {
      records,
      withPlayers,
      withDate,
    };

    this.className = 'map-records';
    this.$component = $parent.find(`.js-${this.className}`);
    this.$tableBody = this.$component.find(`.js-${this.className}__table-body`);

    this.recordEntries = this.options.records.map(
      (record) =>
        new RecordEntry({
          withDate,
          record,
        })
    );

    if (!withPlayers) {
      this.sortRecordEntries();
    }
  }

  public generateRecordEntries(category: MapType) {
    const entries = this.recordEntries.filter(
      (record) =>
        category === 'Total' || record.getOptions().category === category
    );

    return entries;
  }

  public render(recordEntries: Array<RecordEntry>) {
    this.$tableBody.empty();

    recordEntries.forEach((entry) => {
      const $entry = entry.getHtml();
      this.$tableBody.append($entry);
    });
  }

  private sortRecordEntries() {
    this.recordEntries.sort(MapRecords.compareMapEntries);
  }
}

export default MapRecords;