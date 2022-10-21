interface PaginationjsOptions {
  dataSource: Array<any>,
  pageSize?: number,
  pageRange?: number,
  autoHidePrevious?: boolean,
  autoHideNext?: boolean,
  prevText?: string,
  nextText?: string,
  callback?: (data: Array<any>) => void,
}

interface JQuery {
  pagination: (options: PaginationjsOptions) => void;
}