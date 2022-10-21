import "paginationjs";
import { PaginationOptions } from "./types";

class Pagination {
  private options: PaginationOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;

  constructor($parent: JQuery<HTMLElement>, options: PaginationOptions) {
    this.options = options;
    this.className = "pagination";
    this.$component = $parent.find(`.js-${this.className}`);

    this.$component.pagination({
      dataSource: this.options.dataSource,
      pageSize: 25,
      pageRange: 1,
      autoHidePrevious: true,
      autoHideNext: true,
      callback: this.options.render,
    });
  }
}

export default Pagination;