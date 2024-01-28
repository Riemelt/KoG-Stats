import { JSDOM } from 'jsdom';
import * as fs from 'fs';

const { window } = new JSDOM('');
const $ = require('jquery')(window);

import {
  KoGMapEntity,
  KoGMap,
  Finish,
  MapType,
  MapRecord,
} from '../types/types';
import { MAP_TYPES } from '../utilities/utilities';

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

function parseTd(
  topData: KoGMap[],
  items: Array<HTMLElement>,
  map: KoGMapEntity
) {
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

function isMapType(map: string): map is MapType {
  return (
    MAP_TYPES.some((mapType) => mapType === map) ||
    map.trim().toLowerCase() === 'unknown'
  );
}

function parseCard(mapsData: KoGMapEntity[], _: unknown, element: HTMLElement) {
  const $card = $(element);
  const $name = $card.find('h4');
  const name = $name.html();
  const $listGroupItems = $card.find('.list-group-item');
  const items = $listGroupItems.toArray();
  const stars = $(items[0]).find('.bi-star-fill').length;
  const category = items[1].innerHTML;

  if (!isMapType(category)) {
    throw new Error('Parsing card category error');
  }

  const points = Number.parseInt(`${items[2].innerHTML}`.trim());
  const authors = `${items[3].innerHTML}`.trim().split(', ');
  const releaseDate = `${$card.find('.card-footer').html()}`.trim().slice(-10);

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

function saveLogs(errors: string[]) {
  const result = {
    errors,
  };

  try {
    const json = JSON.stringify(result);
    fs.writeFileSync('./src/data/logs.json', json);

    console.log('logs.json saved');
  } catch (error) {
    console.log(`logJson error: ${error}`);
  }
}

function saveJson(topData: Array<KoGMap>, errors: string[]) {
  const result = {
    date: new Date(),
    data: topData,
  };

  try {
    const json = JSON.stringify(result);
    fs.writeFileSync('./src/data/topFinishes.json', json);

    console.log('topFinishes.json saved');
  } catch (error) {
    console.log(`saveJson error: ${error}`);
    errors.push(`saveJson error: ${error}`);
  }
}

function saveTop10Finishes(topData: Array<KoGMap>, errors: string[]) {
  const result = {
    date: new Date(),
    data: topData,
  };

  try {
    const json = JSON.stringify(result);
    fs.writeFileSync('./src/data/top10Finishes.json', json);

    console.log('top10Finishes.json saved');
  } catch (error) {
    console.log(`save top10Finishes error: ${error}`);
    errors.push(`save top10Finishes error: ${error}`);
  }
}

function saveRecords(records: MapRecord[], errors: string[]) {
  const result = {
    date: new Date(),
    data: records,
  };

  try {
    const json = JSON.stringify(result);
    fs.writeFileSync('./src/data/records.json', json);

    console.log('records.json saved');
  } catch (error) {
    console.log(`saveRecords error: ${error}`);
    errors.push(`saveRecords error: ${error}`);
  }
}

function update(
  topData: KoGMap[],
  previousTopFinishes: KoGMap[],
  records: MapRecord[],
  errors: string[]
) {
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

  const recordsWithDates = records.filter(({ date }) => date !== undefined);
  recordsWithDates.forEach(({ time, name, players, date }) => {
    const mapEntry = topData.find((map) => map.name === name);

    if (mapEntry === undefined) return;

    players?.forEach((playerName) => {
      const finishEntry = mapEntry.topFinishes.find(
        (player) => player.name === playerName && player.time === time
      );

      if (finishEntry === undefined) return;

      finishEntry.date = date;
    });
  });

  saveRecords(records, errors);
  saveJson(topData, errors);

  const top10Finishes = topData.map((map) => {
    const top10 = map.topFinishes.filter((finish) => finish.rank <= 10);
    return {
      ...map,
      topFinishes: top10,
    };
  });

  saveTop10Finishes(top10Finishes, errors);
}

function readTopFinishes() {
  try {
    const jsonData = fs.readFileSync('./src/data/topFinishes.json', 'utf8');
    const topFinishes = JSON.parse(jsonData);
    return topFinishes;
  } catch (error) {
    console.log(error);
    throw new Error('Cannot read topFinishes.json');
  }
}

function readRecords() {
  try {
    const jsonData = fs.readFileSync('./src/data/records.json', 'utf8');
    const records = JSON.parse(jsonData);
    return records;
  } catch (error) {
    console.log(error);
    throw new Error('Cannot read records.json');
  }
}

export async function fetchMapsData() {
  const errors: string[] = [];

  const mapsData: Array<KoGMapEntity> = [];
  const topData: Array<KoGMap> = [];

  let count = 0;
  let total = 0;

  try {
    const topFinishes = readTopFinishes();
    const previousTopFinishes: Array<KoGMap> = topFinishes.data;

    const jsonRecords = readRecords();
    const records: MapRecord[] = jsonRecords.data;

    const dataMaps = await getData('https://kog.tw/get.php?p=maps&p=maps');

    const $dataMaps = $(dataMaps);
    const $cardBodies = $dataMaps.find('.card');
    if ($cardBodies.length === 0)
      throw new Error('HTML parsing map cards error');

    $cardBodies.each((index: number, element: HTMLElement) =>
      parseCard(mapsData, index, element)
    );
    total = mapsData.length;

    const mapsLeft = new Set(mapsData);

    const startTimer = new Date().getTime();
    const maxTime = 20 * 60 * 1000;

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
              parseTd(topData, tdArray, map);
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

      if (new Date().getTime() - startTimer > maxTime) {
        throw new Error('max time exceeded');
      }

      if (mapsLeft.size > 0) {
        await waitFor(2000);
      }
    }

    if (count >= total) {
      update(topData, previousTopFinishes, records, errors);
    }
  } catch (error) {
    let errorMessage = 'Unknown Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(`Fetch maps data error: ${errorMessage}`);
    errors.push(`Fetch maps data error: ${errorMessage}`);
  } finally {
    saveLogs(errors);
  }
}
