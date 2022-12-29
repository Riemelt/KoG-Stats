import "../../main-styles";
import "../../layout";

import Records from "./Records";
import "./records.scss";
import { MapRecord } from "../../types/types";
import { RecordsOptions } from "./types";

(function($) {
  const records: {
    data: Array<MapRecord>,
    dateFrom: Date,
    dateTo: Date,
  } = require("../../data/records.json");

  const data = require ("./data.json");

  const recordsOptions: RecordsOptions = {
    mapRecords: {
      records: records.data,
      sortBy: "Total",
      ...data.mapRecords,
    },
    dateFrom: records.dateFrom,
    dateTo: records.dateTo,
  }

  const className = "records";
  new Records($(`.js-${className}`), recordsOptions);
})(jQuery);