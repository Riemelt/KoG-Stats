import {
  KoGMapEntity,
  KoGMap,
  Finish,
  MapType,
  MapRecord,
} from '../src/types/types';

(async function () {
  const { JSDOM } = require('jsdom');
  const { window } = new JSDOM('');
  const $ = require('jquery')(window);

  const jsonData = require('./data/topFinishes.json');

  const previousTopFinishes: Array<KoGMap> = jsonData.data;

  const jsonRecords = require('../src/data/records.json');
  const records: MapRecord[] = jsonRecords.data;

  const waitFor = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  async function getData(url = '') {
    const response = await fetch(url);
    let html;

    if (response.ok) {
      html = await response.text();
    } else {
      console.log('error HTTP: ' + response.status);
      throw new Error('Error on http request');
    }

    return html;
  }

  function parseTd(items: Array<HTMLElement>, map: KoGMapEntity) {
    const topFinishes: Array<Finish> = [];
    let rank = 0;
    let previousTime = -1;
    let j = 0;

    for (let i = 0; i < items.length; i = i + 2) {
      const name = $(items[i + 1].innerHTML).html();
      const time = Number(items[i].innerHTML);

      if (name === undefined || time === undefined) {
        throw new Error('Parsing td error');
      }

      if (time !== previousTime) {
        rank = j;
        previousTime = time;
      }

      topFinishes.push({
        name,
        time,
        rank: rank + 1,
      });

      j += 1;
    }

    topData.push({
      ...map,
      topFinishes,
    });
  }

  function parseCard(_: unknown, element: HTMLElement) {
    const $card = $(element);
    const $name = $card.find('h4');
    const name = $name.html();
    const $listGroupItems = $card.find('.list-group-item');
    const items = $listGroupItems.toArray();
    const stars = $(items[0]).find('.bi-star-fill').length;
    const category: MapType = items[1].innerHTML;
    const points = Number.parseInt(`${items[2].innerHTML}`.trim());
    const authors = `${items[3].innerHTML}`.trim().split(', ');
    const releaseDate = `${$card.find('.card-footer').html()}`
      .trim()
      .slice(-10);

    if (name === undefined || category === undefined) {
      throw new Error('Parsing card error');
    }

    mapsData.push({
      stars,
      points,
      authors,
      releaseDate,
      name,
      category: category.trim().toLowerCase() === 'unknown' ? 'Solo' : category,
    });
  }

  function saveJson(topData: Array<KoGMap>) {
    const fs = require('fs');
    const result = {
      date: new Date(),
      data: topData,
    };

    const json = JSON.stringify(result);
    fs.writeFile('./data/topFinishes.json', json, function (error: Error) {
      if (error) {
        console.log(`saveJson error: ${error}`);
        return;
      }

      console.log('topFinishes.json saved');
    });
  }

  function saveTop5Finishes(topData: Array<KoGMap>) {
    const fs = require('fs');
    const result = {
      date: new Date(),
      data: topData,
    };

    const json = JSON.stringify(result);
    fs.writeFile('./data/top5Finishes.json', json, function (error: Error) {
      if (error) {
        console.log(`save top5Finishes error: ${error}`);
        return;
      }

      console.log('top5Finishes.json saved');
    });
  }

  function saveRecords(records: MapRecord[]) {
    const fs = require('fs');
    const result = {
      data: records,
    };

    const json = JSON.stringify(result);
    fs.writeFile('../src/data/records.json', json, function (error: Error) {
      if (error) {
        console.log(`saveRecords error: ${error}`);
        return;
      }

      console.log('records.json saved');
    });
  }

  function update(topData: KoGMap[]) {
    topData.forEach((kogMap) => {
      if (kogMap.topFinishes.length <= 0) return;
      const previousFinishes =
        previousTopFinishes.find((map) => map.name === kogMap.name)
          ?.topFinishes ?? [];
      const previousRankOne = previousFinishes[0];

      const isNewRank =
        previousRankOne === undefined ||
        previousRankOne.time !== kogMap.topFinishes[0].time;

      if (isNewRank) {
        const { time } = kogMap.topFinishes[0];
        const rank = 1;
        const players = kogMap.topFinishes
          .filter((finish) => finish.time === time)
          .map((finish) => finish.name);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { topFinishes, ...rest } = kogMap;

        records.push({
          ...rest,
          rank,
          players,
          time,
          date: new Date(),
        });
      }
    });

    saveRecords(records);
    saveJson(topData);

    const top5Finishes = topData.map((map) => {
      const top5 = map.topFinishes.filter((finish) => finish.rank <= 5);
      return {
        ...map,
        topFinishes: top5,
      };
    });

    saveTop5Finishes(top5Finishes);
  }

  const mapsData: Array<KoGMapEntity> = [];
  const topData: Array<KoGMap> = [];

  let count = 0;
  let total = 0;

  try {
    const dataMaps = await getData('https://kog.tw/get.php?p=maps&p=maps');

    const $dataMaps = $(dataMaps);
    const $cardBodies = $dataMaps.find('.card');
    if ($cardBodies.length === 0)
      throw new Error('HTML parsing map cards error');

    $cardBodies.each(parseCard);
    total = mapsData.length;

    const mapsLeft = new Set(mapsData);

    while (mapsLeft.size > 0) {
      await Promise.all(
        Array.from(mapsLeft).map((map) => {
          const url = `https://kog.tw/get.php?p=maps&p=maps&map=${map.name}`;
          return getData(url).then(
            (data) => {
              const $data = $(data);
              const $td = $data.find('td');

              if ($td.length > 198) {
                throw new Error('Unexpected td length');
              }

              const tdArray = $td.toArray();
              parseTd(tdArray, map);
              count++;
              mapsLeft.delete(map);

              console.log(`Parsed ${count}/${total}: ${map.name}`);
            },
            (error) => {
              console.log(`${error.message}. Failed to load ${map.name}`);
            }
          );
        })
      );

      if (mapsLeft.size > 0) {
        await waitFor(2000);
      }
    }

    if (count >= total) {
      update(topData);
    }
  } catch (error) {
    let errorMessage = 'Unknown Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(`Fetch maps data error: ${errorMessage}`);
  }
})();
