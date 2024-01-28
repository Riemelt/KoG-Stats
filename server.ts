import { fetchMapsData } from './src/scripts/fetchMapsData';
import { execSync } from 'child_process';

const process = async () => {
  //await fetchMapsData();
  //execSync('npm run build');
  console.log(`Built at ${new Date()}`);
  //execSync('npm run deploy');
  console.log(`Deployed at ${new Date()}`);
  console.log(`Update is done at ${new Date()}`);
};

(async function () {
  process();

  setInterval(() => {
    process();
  }, 1 * 60 * 1000);
})();
