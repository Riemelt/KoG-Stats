import '../../main-styles';
import Layout from '../../layout';
import { Finish, KoGMap, MapRecord } from '../../types/types';

import MapProfile from './MapProfile';
import './map-profile.scss';

(function ($) {
  const data = require('./data.json');
  const topFinishes: {
    data: KoGMap[];
    date: Date;
  } = require('../../data/topFinishes.json');

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const mapName = params.map ?? '';

  let finishes: Finish[] = [];

  const mapRecord: MapRecord[] = topFinishes.data
    .filter(({ name }) => name === mapName)
    .map((map) => {
      const { topFinishes, ...rest } = map;
      finishes = topFinishes;
      const time = topFinishes[0]?.time;

      const players = topFinishes
        .filter((finish) => finish.time === time)
        .map((finish) => finish.name);

      return {
        ...topFinishes[0],
        ...rest,
        players,
      };
    });

  new Layout($(`.js-layout`), { header: { date: topFinishes.date } });

  const className = 'map-profile';

  console.log(mapRecord);

  new MapProfile($(`.js-${className}`), {
    ...data,
    mapName,
    mapRecord,
    mapFinishes: {
      finishes,
    },
  });
})(jQuery);
