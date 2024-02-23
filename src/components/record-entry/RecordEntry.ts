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

  private getMapProfileUrl(name: string) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('map', name);
    return buildUrlPath(`map-profile.html?${urlSearchParams.toString()}`);
  }

  private initStar(isNotActive: boolean) {
    return `
      <span class="${this.className}__star material-icons-outlined ${
      isNotActive ? `${this.className}__star_not-active` : ''
    }">star</span>
    `;
  }

  private initStars(stars: number) {
    const starsHtml = new Array(5)
      .fill(0)
      .map((_, index) => this.initStar(stars - index <= 0))
      .join('');

    return starsHtml;
  }

  private initHtml() {
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

    const authorsTd = this.options.withAuthors
      ? `
      <td class="${this.className}__table-cell-authors">
        ${this.options.record.authors.join(', ')}
      </td>
    `
      : '';

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

    const releaseDateString = this.options.record.releaseDate;
    const releaseDate = new Date(releaseDateString);
    const releaseDateTd = this.options.withReleaseDate
      ? `
        <td
          class="${this.className}__table-cell-date ${
          releaseDate.toString() !== 'Invalid Date'
            ? ''
            : `${this.className}__table-cell-date_no-data`
        }
           js-${this.className}__table-cell-date"
        >
          <span class="${this.className}__date-text">
            ${
              releaseDate.toString() !== 'Invalid Date'
                ? moment(Date.parse(releaseDate.toString())).fromNow()
                : 'no data'
            }
          </span>
          ${
            releaseDate.toString() !== 'Invalid Date'
              ? `
              <div class="${this.className}__date-tooltip">
                ${
                  releaseDate.toString() !== 'Invalid Date'
                    ? releaseDate.toLocaleDateString('en-GB')
                    : releaseDate
                }
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
          <a class="${this.className}__table-cell-name-link" href="${this.getMapProfileUrl(this.options.record.name)}">
            ${this.options.record.name}
          </a>
        </td>
        ${authorsTd}
        ${playersTd}
        ${releaseDateTd}
        <td class="${this.className}__table-cell-category ${this.className}__table-cell-category_${mapCategory} js-${this.className}__table-cell-category">
          <div class="${this.className}__category-wrapper">
            <div class="${this.className}__category-title">
              ${this.options.record.category}
            </div>
            <div class="${this.className}__category-stats">
              <div class="${this.className}__map-points">
                ${this.options.record.points} point${this.options.record.points > 1 ? 's' : ''}
              </div>
              <div class="${this.className}__map-stars">
                ${this.initStars(this.options.record.stars)}
              </div>
            </div>
          </di>
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
