import 'paginationjs';

class Pagination {
  private className: string;
  private $component: JQuery<HTMLElement>;

  constructor($parent: JQuery<HTMLElement>) {
    this.className = 'pagination';
    this.$component = $parent.find(`.js-${this.className}`);
  }

  public render<T>(dataSource?: T[], render?: (data: T[]) => void) {
    this.$component.pagination({
      dataSource,
      pageSize: 25,
      pageRange: 1,
      autoHidePrevious: true,
      autoHideNext: true,
      callback: render,
    });
  }
}

export default Pagination;
