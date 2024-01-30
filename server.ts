import * as fs from 'fs';

import { fetchMapsData } from './src/scripts/fetchMapsData';
import { execSync } from 'child_process';

const ONE_MINUTE = 60 * 1000;
const MINUTES = 1;

const saveTestJson = () => {
  const result = {
    date: new Date(),
    data: 'test',
  };

  try {
    const json = JSON.stringify(result);
    fs.writeFileSync('./src/data/test.json', json);

    console.log('test.json saved');
  } catch (error) {
    console.log(`saveJson error: ${error}`);
  }
};

const process = async () => {
  //await fetchMapsData();
  saveTestJson();

  //execSync('npm run build');
  console.log(`Built at ${new Date()}`);

  //execSync('npm run deploy');
  console.log(`Deployed at ${new Date()}`);
};

(async function () {
  process();

  setInterval(() => {
    process();
  }, ONE_MINUTE * MINUTES);
})();
