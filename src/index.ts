import { htmlPrefilter } from "jquery";

(function() {
  console.log("It works!");

  async function getData(url = "") {
    const response = await fetch(url);
    let html;

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      html = await response.text();
    } else {
      alert("Ошибка HTTP: " + response.status);
    }

    return html;
  }

  getData("https://kog.tw/get.php?p=maps&p=maps").then((data) => {
    const $data = $(data);
    console.log($data);
  });



  //async function postData(url = '', data = {}) {
  //  // Default options are marked with *
  //  const response = await fetch(url, {
  //    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //    mode: 'cors', // no-cors, *cors, same-origin
  //    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //    credentials: 'same-origin', // include, *same-origin, omit
  //    headers: {
  //      'Content-Type': 'application/json',
  //      Origin: "https://kog.tw"
  //      // 'Content-Type': 'application/x-www-form-urlencoded',
  //    },
  //    redirect: 'follow', // manual, *follow, error
  //    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //    body: JSON.stringify(data) // body data type must match "Content-Type" header
  //  });
//
  //  return response.json(); // parses JSON response into native JavaScript objects
  //}
  //
  //postData('https://kog.tw/api.php', { player: "Gotie", type: "players" })
  //  .then((data) => {
  //    const playerData = JSON.parse(data.data);
  //    console.log(playerData); // JSON data parsed by `data.json()` call
  //  });
})();