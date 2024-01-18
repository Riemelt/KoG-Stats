import '../../main-styles';
import { MapRecord } from '../../types/types';
import Layout from '../../layout';

import Records from './Records';
import './records.scss';
import { RecordsOptions } from './types';

(function ($) {
  const records: {
    data: Array<MapRecord>;
    date: Date;
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

  new Layout($(`.js-layout`), { header: { date: records.date } });

  const className = 'records';
  new Records($(`.js-${className}`), recordsOptions);
})(jQuery);
