import { RecordEntryOptions } from './types';
import { convertTime } from '../../utilities/utilities';

class RecordEntry {
  private options: RecordEntryOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $playerLinks: JQuery<HTMLElement>;

  constructor(options: RecordEntryOptions) {
    this.options = options;
    this.className = 'map-records';
    this.$component = this.initHtml();
    this.$playerLinks = this.$component.find(
      `.js-${this.className}__player-link`
    );
    this.setHandlers();
  }

  public getOptions() {
    return this.options.record;
  }

  public getHtml() {
    return this.$component;
  }

  public setHandlers() {
    this.$playerLinks.each((_, element) => {
      const name = element.innerHTML.trim();
      $(element).on('click', this.handleNameClick.bind(this, name));
    });
  }

  private handleNameClick(name: string) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('player', name);
    location.href = `player-profile.html?${urlSearchParams.toString()}`;
  }

  private initHtml() {
    const kogLink = `https://kog.tw/#p=maps&map=${this.options.record.name}`;
    const mapCategory = this.options.record.category.toLowerCase();
    const timeConverted = convertTime(this.options.record.time);
    let playersTd = '';

    if (this.options.record.players !== undefined) {
      playersTd += `
        <td class="${this.className}__table-cell-players">
          ${this.options.record.players
            .map(
              (player) => `
            <a class="${this.className}__player-link js-${this.className}__player-link">
              ${player}
            </a>
          `
            )
            .join('&')}
        </td>
      `;
    }

    return $(`
      <tr class="${this.className}__table-row js-${this.className}__table-row ${this.className}__table-row_body">
        <td class="${this.className}__table-cell-rank js-${this.className}__table-cell-rank ${this.className}__table-cell-rank_rank${this.options.record.rank}">
          ${this.options.record.rank}
        </td>
        <td class="${this.className}__table-cell-name">
          <a class="${this.className}__table-cell-name-link" href="${kogLink}" target="_blank" rel="noopener noreferrer">
            ${this.options.record.name}
          </a>
        </td>
        ${playersTd}
        <td class="${this.className}__table-cell-category ${this.className}__table-cell-category_${mapCategory} js-${this.className}__table-cell-category">
          ${this.options.record.category}
        </td>
        <td class="${this.className}__table-cell-time js-${this.className}__table-cell-time">
          ${timeConverted}
        </td>
      </tr>
    `);
  }
}

export default RecordEntry;
