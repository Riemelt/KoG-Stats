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
    {
      records,
      withPlayers = false,
      withDate = false,
      shouldSort = true,
      isMapsPage = false,
      withAuthors = false,
      withReleaseDate = false,
    }: MapRecordsOptions
  ) {
    this.options = {
      records,
      withPlayers,
      withDate,
      isMapsPage,
      withAuthors,
      withReleaseDate,
    };

    this.className = 'map-records';
    this.$component = $parent.find(`.js-${this.className}`);
    this.$tableBody = this.$component.find(`.js-${this.className}__table-body`);

    this.recordEntries = this.options.records.map(
      (record) =>
        new RecordEntry({
          withDate,
          record,
          isMapsPage,
          withAuthors,
          withReleaseDate,
        })
    );

    if (shouldSort) {
      this.sortRecordEntries();
    }
  }

  public generateRecordEntries({
    mapCategory = 'Total',
    mapName = '',
    playerName = '',
    author = '',
    tiedPlayersFrom = null,
    tiedPlayersTo = null,
  }: {
    mapCategory?: MapType;
    mapName?: string;
    playerName?: string;
    author?: string;
    tiedPlayersFrom?: number | null;
    tiedPlayersTo?: number | null;
  }) {
    const entries = this.recordEntries.filter((record) => {
      const { category, name, players = [], authors } = record.getOptions();

      const from =
        tiedPlayersFrom === null || players.length >= tiedPlayersFrom;
      const to = tiedPlayersTo === null || players.length <= tiedPlayersTo;

      return (
        (mapCategory === 'Total' || category === mapCategory) &&
        from &&
        to &&
        this.doesIncludeMap(name, mapName) &&
        this.doesIncludePlayer(playerName, players) &&
        this.doesIncludePlayer(author, authors)
      );
    });

    if (this.options.isMapsPage) {
      entries.forEach((entry, index) => entry.update(index + 1));
    }

    return entries;
  }

  public render(recordEntries: Array<RecordEntry>) {
    this.$tableBody.empty();

    recordEntries.forEach((entry) => {
      const $entry = entry.getHtml();
      this.$tableBody.append($entry);
    });
  }

  private doesIncludeMap(name: string, mapName: string) {
    return name.toLowerCase().includes(mapName.trim().toLowerCase());
  }

  private doesIncludePlayer(name: string, players: string[]) {
    return (
      name === '' ||
      players.some((player) =>
        player.toLowerCase().includes(name.trim().toLowerCase())
      )
    );
  }

  private sortRecordEntries() {
    this.recordEntries.sort(MapRecords.compareMapEntries);
  }
}

export default MapRecords;
