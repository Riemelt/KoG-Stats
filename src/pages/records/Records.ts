import '../../components/container';
import Pagination from '../../components/pagination';
import MapRecords from '../../components/map-records';
import CategoryMenu from '../../components/category-menu';
import { MapType } from '../../types/types';

import { RecordsOptions } from './types';

class Records {
  private className: string;
  private options: RecordsOptions;
  private $component: JQuery<HTMLElement>;
  private mapRecords: MapRecords;
  private pagination: Pagination;
  private $categoryMenu: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>, options: RecordsOptions) {
    this.options = options;
    this.className = 'records';
    this.$component = $element;

    this.mapRecords = new MapRecords(
      this.$component.find(`.js-${this.className}__map-records`),
      this.options.mapRecords
    );

    this.$categoryMenu = this.$component.find(
      `.js-${this.className}__category-menu`
    );

    const categoryMenuOptions = {
      ...this.options.categoryMenu,
      sortBy: this.options.sortBy,
      onChange: this.handleMenuChange.bind(this),
    };

    new CategoryMenu(this.$categoryMenu, categoryMenuOptions);

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

export default Records;
