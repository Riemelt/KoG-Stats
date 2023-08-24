import {
  KoGMapEntity,
  KoGMap,
  Finish,
  MapType,
} from "../src/types/types";

(function() {
  const { JSDOM } = require("jsdom");
  const { window } = new JSDOM("");
  const $ = require("jquery")(window);

  async function getData(url = "") {
    const response = await fetch(url);
    let html;
  
    if (response.ok) {
      html = await response.text();
    } else {
      console.log("error HTTP: " + response.status);
      throw new Error("Error on http request");
    }
  
    return html;
  }

  function parseTd(items: Array<HTMLElement>, map: KoGMapEntity) {
    const topFinishes: Array<Finish> = [];

    for (let i = 0; i < items.length; i = i + 2) {
      const name = $(items[i+1].innerHTML).html();
      const time = Number(items[i].innerHTML);

      if (name === undefined || time === undefined) {
        throw new Error("Parsing td error");
      }

      topFinishes.push({
        name,
        time,
      });
    }

    topData.push({
      name: map.name,
      category: map.category,
      topFinishes,
    });
  }

  function parseCard(_: unknown, element: HTMLElement) {
    const $card = $(element);
    const $name = $card.find("h4");
    const name = $name.html();
    const $listGroupItems = $card.find(".list-group-item");
    const items = $listGroupItems.toArray();
    const category: MapType = items[1].innerHTML;

    if (name === undefined || category === undefined) {
      throw new Error("Parsing card error");
    }

    mapsData.push({
      name,
      category,
    });
  }

  function saveJson(topData: Array<KoGMap>) {
    const fs = require('fs');
    const result = {
      date: new Date(),
      data: topData,
    };
    
    const json = JSON.stringify(result);
    fs.writeFile("./data/topFinishes.json", json, function(error: Error) {
      if (error) {
        console.log(`saveJson error: ${error}`);
        return;
      }

      console.log("topFinishes.json saved");
    });
  }

  const mapsData: Array<KoGMapEntity> = [];
  const topData: Array<KoGMap> = [];

  let count = 0;
  let total = 0;

  try {
    getData("https://kog.tw/get.php?p=maps&p=maps").then((dataMaps) => {
      const $dataMaps = $(dataMaps);
      const $cardBodies = $dataMaps.find(".card");
      if ($cardBodies.length === 0) throw new Error("HTML parsing map cards erorr");

      $cardBodies.each(parseCard.bind(this));
      total = mapsData.length;
  
      mapsData.forEach(map => {
        const url = `https://kog.tw/get.php?p=maps&p=maps&map=${map.name}`;
        getData(url).then((data) => {
          const $data = $(data);
          const $td = $data.find("td");

          if ($td.length > 198) {
            throw new Error("Unexpected td length");
          }
          
          const tdArray = $td.toArray();
          parseTd(tdArray, map);
          count++;
          console.log(`Parsed ${count}/${total}: ${map.name}`);
          if (count >= total) saveJson(topData);
        });
      });
    });
  } catch(error) {
    let errorMessage = 'Unknown Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(`Fetch maps data error: ${errorMessage}`);
  }
})();