import "../../components/container";
import { RecordsOptions } from "./types";
import Pagination from "../../components/pagination";
import MapRecords from "../../components/map-records";

class Records {
  private className: string;
  private options: RecordsOptions;
  private $component: JQuery<HTMLElement>;
  private $title: JQuery<HTMLElement>;
  private mapRecords: MapRecords;

  constructor($element: JQuery<HTMLElement>, options: RecordsOptions) {
    this.options = options;
    this.className = "records";
    this.$component = $element;

    this.$title = this.$component.find(`.js-${this.className}__title-text`);
    this.$title.html(`Latest records`);

    this.mapRecords = new MapRecords(this.$component.find(`.js-${this.className}__map-records`), this.options.mapRecords);

    new Pagination(this.$component.find(`.js-${this.className}__pagination`), {
      dataSource: this.mapRecords.getRecordEntries(),
      render: this.mapRecords.render.bind(this.mapRecords),
    });
  }
}

export default Records;