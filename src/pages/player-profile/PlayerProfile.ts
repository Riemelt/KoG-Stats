import '../../components/container';

import CategoryMenu from '../../components/category-menu';
import Pagination from '../../components/pagination';
import MapRecords from '../../components/map-records';
import { MapType } from '../../types/types';

import { PlayerProfileOptions } from './types';

class PlayerProfile {
  private className: string;
  private options: PlayerProfileOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private $title: JQuery<HTMLElement>;
  private $titlePlayerName: JQuery<HTMLElement>;
  private mapRecords: MapRecords;
  private pagination: Pagination;

  constructor($element: JQuery<HTMLElement>, options: PlayerProfileOptions) {
    this.options = options;
    this.className = 'player-profile';
    this.$component = $element;

    this.$title = this.$component.find(`.js-${this.className}__title`);
    this.$title.attr(
      'href',
      `https://kog.tw/#p=players&player=${this.options.playerName}`
    );

    this.$titlePlayerName = this.$title.find(
      `.js-${this.className}__title-text`
    );
    this.$titlePlayerName.html(`${this.options.playerName}'s map records`);

    this.$categoryMenu = this.$component.find(
      `.js-${this.className}__category-menu`
    );

    const categoryMenuOptions = {
      ...this.options.categoryMenu,
      sortBy: this.options.sortBy,

      onChange: this.handleMenuChange.bind(this),
    };

    new CategoryMenu(this.$categoryMenu, categoryMenuOptions);

    this.mapRecords = new MapRecords(
      this.$component.find(`.js-${this.className}__map-records`),
      {
        records: this.options.playerRecords,
      }
    );

    this.pagination = new Pagination(
      this.$component.find(`.js-${this.className}__pagination`)
    );

    this.render(this.options.sortBy);
  }

  private handleMenuChange(category: MapType) {
    this.render(category);
  }

  private render(category: MapType) {
    this.pagination.render(
      this.mapRecords.generateRecordEntries(category),
      this.mapRecords.render.bind(this.mapRecords)
    );
  }
}

export default PlayerProfile;
