import * as fs from 'fs';
import shell from 'shelljs';

import { fetchMapsData } from './src/scripts/fetchMapsData';
import 'dotenv/config';
import { WebhookClient } from 'discord.js';
import { convertTime } from './src/utilities/utilities';

const ONE_MINUTE = 60 * 1000;
const MINUTES = 30;

const reportsWebHookClient = new WebhookClient({
  url: process.env.REPORTS_WEB_HOOK ?? '',
});

const recordsWebHookClient = new WebhookClient({
  url: process.env.RECORDS_WEB_HOOK ?? '',
});

const copyFiles = () => {
  fs.copyFileSync('./src/data/logs.json', './src/data/logs-temp.json');
  fs.copyFileSync('./src/data/records.json', './src/data/records-temp.json');
  fs.copyFileSync(
    './src/data/topFinishes.json',
    './src/data/topFinishes-temp.json'
  );
  fs.copyFileSync(
    './src/data/top10Finishes.json',
    './src/data/top10Finishes-temp.json'
  );
};

const doProcess = async () => {
  const parseStartTime = new Date().getTime();
  const { count, total, errors, newRecords } = await fetchMapsData();
  const parseEndTime = new Date().getTime();
  const parseTime = Math.round((parseEndTime - parseStartTime) / 1000);
  const parseTimeConverted = convertTime(parseTime);

  if (errors.length) {
    try {
      copyFiles();
    } catch (error) {
      errors.push(`copying files error`);
    }
  }

  const buildStartTime = new Date().getTime();

  shell.exec(
    'npm run build',
    { timeout: 1000 * 600, maxBuffer: 1024 * 1024 * 10 },
    function (code) {
      console.log('Exit code:', code);
    }
  );

  const buildEndTime = new Date().getTime();
  const buildTime = Math.round((buildEndTime - buildStartTime) / 1000);
  const buildTimeConverted = convertTime(buildTime);

  console.log(`Built at ${new Date()}`);

  const errorsStr = errors.length > 0 ? errors.join(', ') : '';
  const errorMessage = errorsStr.length > 0 ? `**Errors: ${errorsStr}**` : '';
  const parseMessage = `Parsing time: ${parseTimeConverted}`;
  const buildMessage = `Build time: ${buildTimeConverted}`;
  const totalCountMessage = `Parsed ${count}/${total} maps`;
  const newRecordsSummaryMessage =
    newRecords.length > 0 ? `New records: ${newRecords.length}` : '';

  const reportArr = [
    totalCountMessage,
    parseMessage,
    buildMessage,
    newRecordsSummaryMessage,
    errorMessage,
  ]
    .filter((str) => str.length > 0)
    .join(' | ');

  reportsWebHookClient.send(reportArr);

  const url = process.env.DOMAIN;

  if (newRecords.length > 0) {
    const recordsMessages = newRecords.map(
      ({ timeDiff, nextBestTime, time, players, category, name }) => {
        const timeConverted = convertTime(time);
        const improvementMessage =
          timeDiff === null || nextBestTime === null
            ? `(**only** finish!)`
            : `(next best time: ${convertTime(
                nextBestTime
              )} — **${timeDiff.toFixed(2)}%** improvement!)`;

        const playersMessage = players
          ?.map((player) => {
            return `[${player}](${url}/player-profile?player=${encodeURIComponent(
              player
            )})`;
          })
          .join(` & `);

        const mapMessage = `[${name}](${url}/map-profile?map=${encodeURIComponent(
          name
        )})`;

        return `:trophy: New record on [${category}] ${mapMessage}: ${timeConverted} ${playersMessage} ${improvementMessage}`;
      }
    );

    const messages: string[] = [];
    let currentMessage = '';

    while (recordsMessages.length > 0) {
      const record = recordsMessages.pop() ?? '';
      if (currentMessage.length + record.length > 1900) {
        messages.push(currentMessage);
        currentMessage = '';
      }

      if (currentMessage) {
        currentMessage = `${currentMessage}\n${record}`;
        continue;
      }

      currentMessage = record;
    }

    if (currentMessage) {
      messages.push(currentMessage);
    }

    messages.forEach((message) => {
      recordsWebHookClient.send(message);
    });
  }
};

(async function () {
  doProcess();

  setInterval(() => {
    doProcess();
  }, ONE_MINUTE * MINUTES);
})();
