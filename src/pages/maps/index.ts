import '../../main-styles';
import Layout from '../../layout';
import { KoGMap, MapRecord } from '../../types/types';

import Maps from './Maps';
import './maps.scss';

(function ($) {
  const data = require('./data.json');
  const topFinishes: {
    data: KoGMap[];
    date: Date;
  } = require('../../data/top10Finishes.json');

  topFinishes.data.sort(({ name: a }, { name: b }) =>
    a > b ? 1 : a < b ? -1 : 0
  );

  const playerRecords: MapRecord[] = topFinishes.data.map(
    ({ topFinishes, ...rest }) => {
      const time = topFinishes[0]?.time;
      const date = topFinishes[0]?.date;

      const players = topFinishes
        .filter((finish) => finish.rank === 1)
        .map((finish) => finish.name);

      return {
        ...rest,
        time,
        players,
        date,
        rank: 1,
      };
    }
  );

  const mapsData = {
    sortBy: 'Total',
    maps: playerRecords,
    ...data,
  };

  new Layout($(`.js-layout`), { header: { date: topFinishes.date } });

  const className = 'maps';
  new Maps($(`.js-${className}`), mapsData);
})(jQuery);
