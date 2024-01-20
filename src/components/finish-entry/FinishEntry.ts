import moment from 'moment';
import { buildUrlPath, convertTime } from '../../utilities/utilities';

import { FinishEntryOptions } from './types';

class FinishEntry {
  private options: FinishEntryOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;

  constructor(options: FinishEntryOptions) {
    this.options = options;
    this.className = 'map-finishes';
    this.$component = this.initHtml();
  }

  public getOptions() {
    return this.options;
  }

  public getHtml() {
    return this.$component;
  }

  private initHtml() {
    const { rank, name, time, date } = this.options.finish;
    const { rankOneTime } = this.options;

    const timeConverted = convertTime(time);

    const dateString = date;
    const dateResult =
      dateString === undefined ? 'no data' : new Date(dateString);
    const dateTd = `
      <td
        class="${this.className}__table-cell-date ${
      dateResult instanceof Date
        ? ''
        : `${this.className}__table-cell-date_no-data`
    }
         js-${this.className}__table-cell-date"
      >
        <span class="${this.className}__date-text">
          ${
            dateResult instanceof Date
              ? moment(Date.parse(dateResult.toString())).fromNow()
              : dateResult
          }
        </span>
        ${
          dateResult instanceof Date
            ? `
            <div class="${this.className}__date-tooltip">
              ${
                dateResult instanceof Date
                  ? dateResult.toLocaleDateString('en-GB')
                  : dateResult
              }
            </div>`
            : ''
        }
      </td>
    `;

    const percentage = ((time - rankOneTime) / rankOneTime) * 100;

    // prettier-ignore
    return $(`
        <tr class="${this.className}__table-row js-${this.className}__table-row ${this.className}__table-row_body">
          <td class="${this.className}__table-cell-rank ${this.className}__table-cell-rank_rank${rank}">
            ${rank}
          </td>
          <td class="${this.className}__table-cell-name ${this.className}__table-cell-name_body">
            <a class="${this.className}__table-cell-name-link js-${this.className}__table-cell-name-link" href="${this.getPlayerProfileUrl(name)}">
              ${name}
            </a>
          </td>
          ${dateTd}
          <td class="${this.className}__table-cell-time-diff ${percentage > 0 ? `${this.className}__table-cell-time-diff_slower` : ''}">
            +${percentage.toFixed(2)}%
          </td>
          <td class="${this.className}__table-cell-time">
            ${timeConverted}
          </td>
        </tr>
      `);
  }

  private getPlayerProfileUrl(name: string) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('player', name);
    return buildUrlPath(`player-profile.html?${urlSearchParams.toString()}`);
  }
}

export default FinishEntry;
