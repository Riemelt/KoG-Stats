import '../../main-styles';
import Layout from '../../layout';
import { KoGMap, MapRecord } from '../../types/types';

import PlayerProfile from './PlayerProfile';
import './player-profile.scss';

(function ($) {
  const data = require('./data.json');
  const topFinishes: {
    data: KoGMap[];
    date: Date;
  } = require('../../data/top10Finishes.json');

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const playerName = params.player === undefined ? '' : params.player;

  const playerRecords: MapRecord[] = topFinishes.data
    .filter(({ topFinishes }) =>
      topFinishes.some(({ name }) => name === playerName)
    )
    .map(({ topFinishes, ...rest }) => {
      const playerFinish = topFinishes.filter(
        ({ name }) => playerName === name
      )[0];

      const { time, rank, date } = playerFinish;

      const players = topFinishes
        .filter((finish) => finish.time === time)
        .map((finish) => finish.name);

      return {
        ...rest,
        time,
        rank,
        players,
        date,
      };
    });

  const playerProfileData = {
    playerName,
    playerRecords,
    sortBy: 'Total',
    ...data,
  };

  new Layout($(`.js-layout`), { header: { date: topFinishes.date } });

  const className = 'player-profile';
  new PlayerProfile($(`.js-${className}`), playerProfileData);
})(jQuery);
