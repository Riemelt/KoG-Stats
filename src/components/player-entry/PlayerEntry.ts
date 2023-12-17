import { Category, MapType } from '../../types/types';
import { RANK_TYPES, buildUrlPath } from '../../utilities/utilities';
import { PlayerEntryOptions } from './types';

class PlayerEntry {
  private options: PlayerEntryOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $rank: JQuery<HTMLElement>;
  private $ranks: JQuery<HTMLElement>;
  private $link: JQuery<HTMLElement>;

  constructor(options: PlayerEntryOptions) {
    this.options = options;
    this.className = 'leaderboard';
    this.$component = this.initHtml();
    this.$rank = this.$component.find(`.js-${this.className}__table-cell-rank`);
    this.$ranks = this.$component.find(
      `.js-${this.className}__table-cell-total-ranks`
    );
    this.$link = this.$component.find(
      `.js-${this.className}__table-cell-name-link`
    );
  }

  public getOptions() {
    return this.options.player;
  }

  public getHtml() {
    return this.$component;
  }

  public hasAnyRanks(mapType: MapType): boolean {
    for (let i = 0; i < RANK_TYPES.length; i++) {
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

  public makeActive(rank: number) {
    this.$rank.addClass(`${this.className}__table-cell-rank_rank${rank}`);
  }

  public removeActive(rank: number) {
    this.$rank.removeClass(`${this.className}__table-cell-rank_rank${rank}`);
  }

  private initHtml() {
    const ranksTd = new Array(5)
      .fill(0)
      .map(
        (_, index) => `
      <td
        class="${this.className}__table-cell-total-ranks js-${
          this.className
        }__table-cell-total-ranks ${
          this.className
        }__table-cell-total-ranks_rank${index + 1}">
        0
      </td>
    `
      )
      .join('');

    // prettier-ignore
    return $(`
        <tr class="${this.className}__table-row js-${this.className}__table-row ${this.className}__table-row_body">
          <td class="${this.className}__table-cell-rank js-${this.className}__table-cell-rank">
            ${1}
          </td>
          <td class="${this.className}__table-cell-name ${this.className}__table-cell-name_body">
            <a class="${this.className}__table-cell-name-link js-${this.className}__table-cell-name-link" href="${this.getPlayerProfileUrl(this.options.player.name)}">
              ${this.options.player.name}
            </a>
          </td>
          ${ranksTd}
        </tr>
      `);
  }

  private getPlayerProfileUrl(name: string) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('player', name);
    return buildUrlPath(`player-profile.html?${urlSearchParams.toString()}`);
  }

  private setRank(rank: number) {
    this.$rank.html(rank.toString());
    new Array(3).fill(0).forEach((_, index) => this.removeActive(index + 1));
    if (rank >= 1 && rank <= 3) {
      this.makeActive(rank);
    }
  }

  private setRanks(ranks: Category) {
    this.$ranks.each((index, element) => {
      const $element = $(element);
      $element.html(ranks[RANK_TYPES[index]].toString());
    });
  }
}

export default PlayerEntry;
