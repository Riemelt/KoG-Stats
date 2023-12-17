import '../../main-styles';
import '../../layout';

import Records from './Records';
import './records.scss';
import { MapRecord } from '../../types/types';
import { RecordsOptions } from './types';

(function ($) {
  const records: {
    data: Array<MapRecord>;
  } = require('../../data/records.json');

  const data = require('./data.json');

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const sortBy = params.sortBy === undefined ? 'Total' : params.sortBy;

  const recordsOptions: RecordsOptions = {
    ...data,
    sortBy,
    mapRecords: {
      records: records.data.reverse(),
      ...data.mapRecords,
    },
  };

  const className = 'records';
  new Records($(`.js-${className}`), recordsOptions);
})(jQuery);
