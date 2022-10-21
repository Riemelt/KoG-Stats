import "../../main-styles";
import "../../layout";

import Landing from "./Landing";
import "./index.scss";

(function($) {
  const data = require("./data.json");
  const topRanks = require("../../data/topRanks.json");
  const players = topRanks.topRanks;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const sortBy = params.sortBy === undefined ? "Total" : params.sortBy;

  const landingData = {
    sortBy,
    players,
    ...data,
  }

  const className = "landing";
  new Landing($(`.js-${className}`), landingData);

})(jQuery);