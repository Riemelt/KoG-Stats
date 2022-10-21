import Layout from "./Layout";
import "./layout.scss";

(function($){
  const data = require("../data/topRanks.json")
  const className = "layout";

  new Layout($(`.js-${className}`), { header: { date: data.date } });
})(jQuery);