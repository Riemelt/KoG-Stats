import '../../components/container';
import { PlayerProfileOptions } from './types';
import CategoryMenu from '../../components/category-menu';
import Pagination from '../../components/pagination';
import MapRecords from '../../components/map-records';

class PlayerProfile {
  private className: string;
  private options: PlayerProfileOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private $title: JQuery<HTMLElement>;
  private $titlePlayerName: JQuery<HTMLElement>;
  private categoryMenu: CategoryMenu;
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
      sortBy: this.options.sortBy,
      ...this.options.categoryMenu,
    };
    this.categoryMenu = new CategoryMenu(this.$component, categoryMenuOptions);

    this.mapRecords = new MapRecords(
      this.$component.find(`.js-${this.className}__map-records`),
      {
        sortBy: this.options.sortBy,
        records: this.options.playerRecords,
      }
    );

    this.pagination = new Pagination(
      this.$component.find(`.js-${this.className}__pagination`)
    );

    this.render();
  }

  private render() {
    this.pagination.render(
      this.mapRecords.getRecordEntries(),
      this.mapRecords.render.bind(this.mapRecords)
    );
  }
}

export default PlayerProfile;
