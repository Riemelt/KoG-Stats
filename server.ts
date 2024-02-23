import * as fs from 'fs';

import { fetchMapsData } from './src/scripts/fetchMapsData';
import { execSync } from 'child_process';

const ONE_MINUTE = 60 * 1000;
const MINUTES = 10;

const readTestJson = () => {
  try {
    const jsonData = fs.readFileSync('./src/data/test.json', 'utf8');
    const test = JSON.parse(jsonData);
    return test;
  } catch (error) {
    console.log(error);
    throw new Error('Cannot read test.json');
  }
};

const saveTestJson = (bob: number[]) => {
  const result = {
    bob,
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
  await fetchMapsData();

  //const test = readTestJson();
  //const bob = test.bob ?? [1];
  //bob.push(bob.length + 1);
  //console.log(bob);
  //console.log('new ver');
  //saveTestJson(bob);

  execSync('npm run build');
  console.log(`Built at ${new Date()}`);
};

(async function () {
  process();

  setInterval(() => {
    process();
  }, ONE_MINUTE * MINUTES);
})();
