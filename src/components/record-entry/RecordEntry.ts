import moment from 'moment';

import { RecordEntryOptions } from './types';
import { buildUrlPath, convertTime } from '../../utilities/utilities';

class RecordEntry {
  private options: RecordEntryOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $rank: JQuery<HTMLElement>;

  constructor(options: RecordEntryOptions) {
    this.options = options;
    this.className = 'map-records';
    this.$component = this.initHtml();
    this.$rank = this.$component.find(`.js-${this.className}__table-cell-rank`);
  }

  public getOptions() {
    return this.options.record;
  }

  public update(rank: number) {
    this.$rank.html(`${rank}`);
  }

  public getHtml() {
    return this.$component;
  }

  private getPlayerProfileUrl(name: string) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('player', name);
    return buildUrlPath(`player-profile.html?${urlSearchParams.toString()}`);
  }

  private initHtml() {
    const kogLink = `https://kog.tw/#p=maps&map=${this.options.record.name}`;
    const mapCategory = this.options.record.category.toLowerCase();
    const timeConverted =
      this.options.record.time === undefined
        ? 'unfinished'
        : convertTime(this.options.record.time);
    let playersTd = '';

    if (this.options.record.players !== undefined) {
      playersTd += `
        <td class="${this.className}__table-cell-players ${
        this.options.record.players.length === 0
          ? `${this.className}__table-cell-players_no-data`
          : ''
      }">
          ${
            this.options.record.players.length
              ? this.options.record.players.map(
                  (player) => `
            <a
              class="${this.className}__player-link"
              href="${this.getPlayerProfileUrl(player)}"
            >
              ${player}
            </a>
          `
                ).join(`
            <span class="${this.className}__player-separator">
              &
            </span>
            `)
              : 'unfinished'
          }
        </td>
      `;
    }

    const dateString = this.options.record.date;
    const date = dateString === undefined ? 'no data' : new Date(dateString);
    const dateTd = this.options.withDate
      ? `
      <td
        class="${this.className}__table-cell-date ${
          date instanceof Date
            ? ''
            : `${this.className}__table-cell-date_no-data`
        }
         js-${this.className}__table-cell-date"
      >
        <span class="${this.className}__date-text">
          ${
            date instanceof Date
              ? moment(Date.parse(date.toString())).fromNow()
              : date
          }
        </span>
        ${
          date instanceof Date
            ? `
            <div class="${this.className}__date-tooltip">
              ${date instanceof Date ? date.toLocaleDateString('en-GB') : date}
            </div>`
            : ''
        }
      </td>
    `
      : '';

    // prettier-ignore
    return $(`
      <tr class="${this.className}__table-row js-${this.className}__table-row ${this.className}__table-row_body">
        <td class="${this.className}__table-cell-rank js-${this.className}__table-cell-rank ${!this.options.isMapsPage ? `${this.className}__table-cell-rank_rank${this.options.record.rank}` : ''}">
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
        ${dateTd}
        <td class="${this.className}__table-cell-time js-${this.className}__table-cell-time ${timeConverted === 'unfinished' ? `${this.className}__table-cell-time_no-data` : ''}">
          ${timeConverted}
        </td>
      </tr>
    `);
  }
}

export default RecordEntry;
