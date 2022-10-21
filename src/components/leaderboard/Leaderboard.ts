import PlayerEntry from "../player-entry";
import { LeaderboardOptions } from "./types";
import { comparePlayersRanks } from "../../utilities/utilities";
import { MapType } from "../../types/types";

class Leaderboard {
  private options: LeaderboardOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $playerEntries: JQuery<HTMLElement>;
  private $tableBody: JQuery<HTMLElement>;
  private playerEntries: Array<PlayerEntry>;

  static comparePlayerEntries(mapType: MapType) {
    return function(a: PlayerEntry, b: PlayerEntry) {
      return comparePlayersRanks(a.getOptions(), b.getOptions(), mapType, 0);
    }
  }

  constructor($parent: JQuery<HTMLElement>, options: LeaderboardOptions) {
    this.options = options;
    this.className = "leaderboard";
    this.$component = $parent.find(`.js-${this.className}`);
    this.$tableBody = this.$component.find(`.js-${this.className}__table-body`);

    this.$playerEntries = this.$component.find(`.js-${this.className}__table-row`);
    this.playerEntries = [];
    this.$playerEntries.each(this.initPlayerEntry.bind(this));

    if (this.options.sortBy !== "Total") {
      this.initLeaderboard();
    } else {
      this.playerEntries[0].update("Total", 1);
      this.playerEntries[1].update("Total", 2);
      this.playerEntries[2].update("Total", 3);
    }
  }

  public getPlayerEntries() {
    return this.playerEntries.filter(playerEntry => playerEntry.hasAnyRanks(this.options.sortBy));
  }

  public render(data: Array<PlayerEntry>) {
    this.$tableBody.empty();

    data.forEach((playerEntry) => {
      const $playerEntry = playerEntry.getHtml();
      this.$tableBody.append($playerEntry);
    });
  }

  private initLeaderboard() {
    this.$tableBody.empty();
    const mapType = this.options.sortBy;

    this.playerEntries = this.playerEntries.sort(Leaderboard.comparePlayerEntries(mapType)).reverse();

    this.playerEntries.forEach((playerEntry, index) => {
      if (playerEntry.hasAnyRanks(mapType)) {
        playerEntry.update(mapType, index + 1);
        const $playerEntry = playerEntry.getHtml();
        this.$tableBody.append($playerEntry);
      }
    })
  }

  private initPlayerEntry(index: number, element: HTMLElement) {
    const $element = $(element);
    this.playerEntries.push(new PlayerEntry($element, {
      player: this.options.players[index],
    }));
  }
}

export default Leaderboard;