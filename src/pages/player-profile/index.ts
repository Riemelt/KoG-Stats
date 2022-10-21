import "../../main-styles";
import "../../layout";

import PlayerProfile from "./PlayerProfile";
import "./player-profile.scss";

(function($) {
  const data = require("./data.json");
  const playersRecords = require("../../data/playerRecords.json");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  
  const sortBy = params.sortBy === undefined ? "Total" : params.sortBy;
  const playerName = params.player === undefined ? "" : params.player;
  const playerRecords = playersRecords[playerName] === undefined ? [] : playersRecords[playerName];

  const playerProfileData = {
    playerName,
    sortBy,
    playerRecords,
    ...data,
  }

  const className = "player-profile";
  new PlayerProfile($(`.js-${className}`), playerProfileData);

})(jQuery);