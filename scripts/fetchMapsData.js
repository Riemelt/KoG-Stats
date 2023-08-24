"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
(function () {
    var _this = this;
    var JSDOM = require("jsdom").JSDOM;
    var window = new JSDOM("").window;
    var $ = require("jquery")(window);
    function getData(url) {
        if (url === void 0) { url = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var response, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        html = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.log("error HTTP: " + response.status);
                        throw new Error("Error on http request");
                    case 4: return [2 /*return*/, html];
                }
            });
        });
    }
    function parseTd(items, map) {
        var topFinishes = [];
        for (var i = 0; i < items.length; i = i + 2) {
            var name_1 = $(items[i + 1].innerHTML).html();
            var time = Number(items[i].innerHTML);
            if (name_1 === undefined || time === undefined) {
                throw new Error("Parsing td error");
            }
            topFinishes.push({
                name: name_1,
                time: time
            });
        }
        topData.push({
            name: map.name,
            category: map.category,
            topFinishes: topFinishes
        });
    }
    function parseCard(_, element) {
        var $card = $(element);
        var $name = $card.find("h4");
        var name = $name.html();
        var $listGroupItems = $card.find(".list-group-item");
        var items = $listGroupItems.toArray();
        var category = items[1].innerHTML;
        if (name === undefined || category === undefined) {
            throw new Error("Parsing card error");
        }
        mapsData.push({
            name: name,
            category: category
        });
    }
    function saveJson(topData) {
        var fs = require('fs');
        var result = {
            date: new Date(),
            data: topData
        };
        var json = JSON.stringify(result);
        fs.writeFile("./data/topFinishes.json", json, function (error) {
            if (error) {
                console.log("saveJson error: ".concat(error));
                return;
            }
            console.log("topFinishes.json saved");
        });
    }
    var mapsData = [];
    var topData = [];
    var count = 0;
    var total = 0;
    try {
        getData("https://kog.tw/get.php?p=maps&p=maps").then(function (dataMaps) {
            var $dataMaps = $(dataMaps);
            var $cardBodies = $dataMaps.find(".card");
            if ($cardBodies.length === 0)
                throw new Error("HTML parsing map cards erorr");
            $cardBodies.each(parseCard.bind(_this));
            total = mapsData.length;
            mapsData.forEach(function (map) {
                var url = "https://kog.tw/get.php?p=maps&p=maps&map=".concat(map.name);
                getData(url).then(function (data) {
                    var $data = $(data);
                    var $td = $data.find("td");
                    if ($td.length > 198) {
                        throw new Error("Unexpected td length");
                    }
                    var tdArray = $td.toArray();
                    parseTd(tdArray, map);
                    count++;
                    console.log("Parsed ".concat(count, "/").concat(total, ": ").concat(map.name));
                    if (count >= total)
                        saveJson(topData);
                });
            });
        });
    }
    catch (error) {
        var errorMessage = 'Unknown Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log("Fetch maps data error: ".concat(errorMessage));
    }
})();
