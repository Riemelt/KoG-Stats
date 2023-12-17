import '../../components/container';
import Pagination from '../../components/pagination';
import MapRecords from '../../components/map-records';

import { RecordsOptions } from './types';

class Records {
  private className: string;
  private options: RecordsOptions;
  private $component: JQuery<HTMLElement>;
  private $title: JQuery<HTMLElement>;
  private mapRecords: MapRecords;
  private pagination: Pagination;

  constructor($element: JQuery<HTMLElement>, options: RecordsOptions) {
    this.options = options;
    this.className = 'records';
    this.$component = $element;

    this.$title = this.$component.find(`.js-${this.className}__title-text`);
    this.$title.html(`Latest records`);

    this.mapRecords = new MapRecords(
      this.$component.find(`.js-${this.className}__map-records`),
      this.options.mapRecords
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

export default Records;
