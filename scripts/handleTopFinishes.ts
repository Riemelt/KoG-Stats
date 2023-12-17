import {
  Category,
  Categories,
  PlayerRanks,
  KoGMap,
  PlayersMapRecords,
} from '../src/types/types';

import { RANK_TYPES, comparePlayers } from '../src/utilities/utilities';

(function () {
  const jsonData = require('./data/topFinishes.json');

  const lastUpdateDate: Date = jsonData.date;
  const maps: Array<KoGMap> = jsonData.data;

  const playerRecords: PlayersMapRecords = {};

  const playersTopRanks: {
    [key: string]: Categories;
  } = {};

  function initRankTypes(): Category {
    return {
      'rank 1': 0,
      'rank 2': 0,
      'rank 3': 0,
      'rank 4': 0,
      'rank 5': 0,
    };
  }

  function initMapTypes(): Categories {
    return {
      Easy: initRankTypes(),
      Main: initRankTypes(),
      Hard: initRankTypes(),
      Insane: initRankTypes(),
      Mod: initRankTypes(),
      Extreme: initRankTypes(),
      Total: initRankTypes(),
      Solo: initRankTypes(),
    };
  }

  function addNewPlayer(name: string) {
    const categories = initMapTypes();
    playersTopRanks[name] = categories;

    playerRecords[name] = [];
  }

  function handleMap(map: KoGMap) {
    const { topFinishes, ...rest } = map;
    let currentRank = 0;
    let previousTime = -1;

    for (let i = 0; i < topFinishes.length; i++) {
      const { name, time } = topFinishes[i];
      if (time !== previousTime) {
        currentRank = i;
      }

      if (currentRank >= 5) break;

      if (playersTopRanks[name] === undefined) {
        addNewPlayer(name);
      }

      playerRecords[name].push({
        ...rest,
        time,
        rank: currentRank + 1,
      });

      playersTopRanks[name][map.category][RANK_TYPES[currentRank]] += 1;
      playersTopRanks[name]['Total'][RANK_TYPES[currentRank]] += 1;
      previousTime = time;
    }
  }

  function convertPlayersTopRanksToArray() {
    const playersArray = [];

    for (const player in playersTopRanks) {
      const playerObject = {
        name: player,
        categories: playersTopRanks[player],
      };

      playersArray.push(playerObject);
    }

    return playersArray;
  }

  maps.forEach(handleMap);
  const playersTopRanksArray: Array<PlayerRanks> =
    convertPlayersTopRanksToArray();
  const result = {
    date: lastUpdateDate,
    topRanks: playersTopRanksArray.sort(comparePlayers('Total')).reverse(),
  };

  const fs = require('fs');
  const json = JSON.stringify(result);
  const playerRecordsJson = JSON.stringify(playerRecords);

  fs.writeFile('../src/data/topRanks.json', json, function (error: Error) {
    if (error) return error;
  });

  fs.writeFile(
    '../src/data/playerRecords.json',
    playerRecordsJson,
    function (error: Error) {
      if (error) return error;
    }
  );
})();
