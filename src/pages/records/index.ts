import "../../main-styles";
import "../../layout";

import Records from "./Records";
import "./records.scss";
import { MapRecord } from "../../types/types";
import { RecordsOptions } from "./types";

(function($) {
  const records: {
    data: Array<MapRecord>,
  } = require("../../data/records.json");

  const data = require ("./data.json");

  const recordsOptions: RecordsOptions = {
    mapRecords: {
      records: records.data.reverse(),
      sortBy: "Total",
      ...data.mapRecords,
    },
  }

  const className = "records";
  new Records($(`.js-${className}`), recordsOptions);
})(jQuery);