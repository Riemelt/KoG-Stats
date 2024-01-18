import PlayerEntry from '../player-entry';
import { LeaderboardOptions } from './types';
import { comparePlayersRanks } from '../../utilities/utilities';
import { MapType } from '../../types/types';

class Leaderboard {
  private options: LeaderboardOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $tableBody: JQuery<HTMLElement>;
  private playerEntries: Array<PlayerEntry>;
  private activeCategory: MapType = 'Total';

  static comparePlayerEntries(mapType: MapType) {
    return function (a: PlayerEntry, b: PlayerEntry) {
      return comparePlayersRanks(a.getOptions(), b.getOptions(), mapType, 0);
    };
  }

  constructor($parent: JQuery<HTMLElement>, options: LeaderboardOptions) {
    this.options = options;
    this.className = 'leaderboard';
    this.activeCategory = this.options.sortBy;
    this.$component = $parent.find(`.js-${this.className}`);
    this.$tableBody = this.$component.find(`.js-${this.className}__table-body`);

    this.playerEntries = options.players.map(
      (player) => new PlayerEntry({ player })
    );
  }

  public generatePlayerEntries(
    category: MapType,
    name: string,
    shouldUpdate = true
  ) {
    this.activeCategory = category;

    const entries = this.playerEntries
      .sort(Leaderboard.comparePlayerEntries(this.activeCategory))
      .reverse();

    if (shouldUpdate) {
      entries.forEach((playerEntry, index) => {
        playerEntry.update(this.activeCategory, index + 1);
      });
    }

    return entries.filter((player) => {
      return player
        .getOptions()
        .name.toLowerCase()
        .includes(name.trim().toLowerCase());
    });
  }

  public render(data: Array<PlayerEntry>) {
    this.$tableBody.empty();

    data.forEach((playerEntry) => {
      const $playerEntry = playerEntry.getHtml();
      this.$tableBody.append($playerEntry);
    });
  }
}

export default Leaderboard;
