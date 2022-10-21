import { Category, MapType } from "../../types/types";
import { RANK_TYPES, MAP_TYPES } from "../../utilities/utilities";
import { PlayerEntryOptions } from "./types";

class PlayerEntry {
  private options: PlayerEntryOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $rank: JQuery<HTMLElement>;
  private $ranks: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>, options: PlayerEntryOptions) {
    this.options = options;
    this.className = "leaderboard";
    this.$component = $element;
    this.$rank = this.$component.find(`.js-${this.className}__table-cell-rank`);
    this.$ranks = this.$component.find(`.js-${this.className}__table-cell-total-ranks`);
  }

  public getOptions() {
    return this.options.player;
  }

  public getHtml() {
    return this.$component;
  }

  public hasAnyRanks(mapType: MapType): boolean {
    for (let i = 0; i < RANK_TYPES.length; i++)
    {
      const ranks = this.options.player.categories[mapType][RANK_TYPES[i]];
      if (ranks > 0) return true;
    }
    return false;
  }

  public update(sortBy: MapType, rank: number) {
    this.setRank(rank);
    const ranks = this.options.player.categories[sortBy];
    this.setRanks(ranks);
  }

  private setRank(rank: number) {
    this.$rank.html(rank.toString());
  }

  private setRanks(ranks: Category) {
    this.$ranks.each((index, element) => {
      const $element = $(element);
      $element.html(ranks[RANK_TYPES[index]].toString());
    });
  }
}

export default PlayerEntry;