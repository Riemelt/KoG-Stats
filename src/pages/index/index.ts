import '../../main-styles';
import Layout from '../../layout';
import { KoGMap } from '../../types/types';

import Landing from './Landing';
import './index.scss';

(function ($) {
  const data = require('./data.json');
  const topFinishes = require('../../data/top10Finishes.json');

  const mapFinishes: KoGMap[] = topFinishes.data;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const sortBy = params.sortBy === undefined ? 'Total' : params.sortBy;

  const landingData = {
    sortBy,
    topRanks: mapFinishes,
    ...data,
  };

  new Layout($(`.js-layout`), { header: { date: topFinishes.date } });

  const className = 'landing';

  new Landing($(`.js-${className}`), landingData);
})(jQuery);
