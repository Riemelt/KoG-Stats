//import * as fs from 'fs';

import { fetchMapsData } from './src/scripts/fetchMapsData';
import { execSync } from 'child_process';
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

const doProcess = async () => {
  const parseStartTime = new Date().getTime();
  const { count, total, errors, newRecords } = await fetchMapsData();
  const parseEndTime = new Date().getTime();
  const parseTime = convertTime(
    Math.round((parseEndTime - parseStartTime) / 1000)
  );

  const buildStartTime = new Date().getTime();

  execSync('npm run build');
  console.log(`Built at ${new Date()}`);

  const buildEndTime = new Date().getTime();
  const buildTime = convertTime(
    Math.round((buildEndTime - buildStartTime) / 1000)
  );

  const errorsStr = errors.length > 0 ? errors.join(', ') : '';
  const errorMessage = errorsStr.length > 0 ? `**Errors: ${errorsStr}**` : '';
  const parseMessage = `Parsing time: ${parseTime}`;
  const buildMessage = `Build time: ${buildTime}`;
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
            return `[${player}](${url}/player-profile?player=${player})`;
          })
          .join(` & `);

        const mapMessage = `[${name}](${url}/map-profile?map=${name})`;

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

  //execSync('npm run deploy');
  //console.log(`Deployed at ${new Date()}`);
};

(async function () {
  doProcess();

  setInterval(() => {
    doProcess();
  }, ONE_MINUTE * MINUTES);
})();
