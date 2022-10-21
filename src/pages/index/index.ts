import "../../main-styles";
import "../../layout";

import Landing from "./Landing";
import "./index.scss";

(function($) {
  const data = require("./data.json")
  //const urlSearchParams = new URLSearchParams(window.location.search);
  //const params = Object.fromEntries(urlSearchParams.entries());

  const className = "landing";
  new Landing($(`.js-${className}`), data);

})(jQuery);