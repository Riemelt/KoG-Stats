"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
(function () {
    return __awaiter(this, void 0, void 0, function () {
        function getData(url) {
            if (url === void 0) { url = ''; }
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
                            console.log('error HTTP: ' + response.status);
                            throw new Error('Error on http request');
                        case 4: return [2 /*return*/, html];
                    }
                });
            });
        }
        function parseTd(items, map) {
            var topFinishes = [];
            var rank = 0;
            var previousTime = -1;
            var j = 0;
            for (var i = 0; i < items.length; i = i + 2) {
                var name_1 = $(items[i + 1].innerHTML).html();
                var time = Number(items[i].innerHTML);
                if (name_1 === undefined || time === undefined) {
                    throw new Error('Parsing td error');
                }
                if (time !== previousTime) {
                    rank = j;
                    previousTime = time;
                }
                topFinishes.push({
                    name: name_1,
                    time: time,
                    rank: rank + 1
                });
                j += 1;
            }
            topData.push(__assign(__assign({}, map), { topFinishes: topFinishes }));
        }
        function parseCard(_, element) {
            var $card = $(element);
            var $name = $card.find('h4');
            var name = $name.html();
            var $listGroupItems = $card.find('.list-group-item');
            var items = $listGroupItems.toArray();
            var stars = $(items[0]).find('.bi-star-fill').length;
            var category = items[1].innerHTML;
            var points = Number.parseInt("".concat(items[2].innerHTML).trim());
            var authors = "".concat(items[3].innerHTML).trim().split(', ');
            var releaseDate = "".concat($card.find('.card-footer').html())
                .trim()
                .slice(-10);
            if (name === undefined || category === undefined) {
                throw new Error('Parsing card error');
            }
            mapsData.push({
                stars: stars,
                points: points,
                authors: authors,
                releaseDate: releaseDate,
                name: name,
                category: category.trim().toLowerCase() === 'unknown' ? 'Solo' : category
            });
        }
        function saveLogs() {
            var fs = require('fs');
            var result = {
                errors: errors
            };
            var json = JSON.stringify(result);
            fs.writeFile('../src/data/logs.json', json, function (error) {
                if (error) {
                    console.log("logJson error: ".concat(error));
                    return;
                }
                console.log('logs.json saved');
            });
        }
        function saveJson(topData) {
            var fs = require('fs');
            var result = {
                date: new Date(),
                data: topData
            };
            var json = JSON.stringify(result);
            fs.writeFile('../src/data/topFinishes.json', json, function (error) {
                if (error) {
                    console.log("saveJson error: ".concat(error));
                    errors.push("saveJson error: ".concat(error));
                    return;
                }
                console.log('topFinishes.json saved');
            });
        }
        function saveTop10Finishes(topData) {
            var fs = require('fs');
            var result = {
                date: new Date(),
                data: topData
            };
            var json = JSON.stringify(result);
            fs.writeFile('../src/data/top10Finishes.json', json, function (error) {
                if (error) {
                    console.log("save top10Finishes error: ".concat(error));
                    errors.push("save top10Finishes error: ".concat(error));
                    return;
                }
                console.log('top10Finishes.json saved');
            });
        }
        function saveRecords(records) {
            var fs = require('fs');
            var result = {
                date: new Date(),
                data: records
            };
            var json = JSON.stringify(result);
            fs.writeFile('../src/data/records.json', json, function (error) {
                if (error) {
                    console.log("saveRecords error: ".concat(error));
                    errors.push("saveRecords error: ".concat(error));
                    return;
                }
                console.log('records.json saved');
            });
        }
        function update(topData) {
            topData.forEach(function (kogMap) {
                var _a, _b;
                if (kogMap.topFinishes.length <= 0)
                    return;
                var previousFinishes = (_b = (_a = previousTopFinishes.find(function (map) { return map.name === kogMap.name; })) === null || _a === void 0 ? void 0 : _a.topFinishes) !== null && _b !== void 0 ? _b : [];
                var previousRankOne = previousFinishes[0];
                var isNewRank = previousRankOne === undefined ||
                    previousRankOne.time !== kogMap.topFinishes[0].time;
                if (isNewRank) {
                    var time_1 = kogMap.topFinishes[0].time;
                    var rank = 1;
                    var players = kogMap.topFinishes
                        .filter(function (finish) { return finish.time === time_1; })
                        .map(function (finish) { return finish.name; });
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    var topFinishes = kogMap.topFinishes, rest = __rest(kogMap, ["topFinishes"]);
                    records.push(__assign(__assign({}, rest), { rank: rank, players: players, time: time_1, date: new Date() }));
                }
            });
            var recordsWithDates = records.filter(function (_a) {
                var date = _a.date;
                return date !== undefined;
            });
            recordsWithDates.forEach(function (_a) {
                var time = _a.time, name = _a.name, players = _a.players, date = _a.date;
                var mapEntry = topData.find(function (map) { return map.name === name; });
                if (mapEntry === undefined)
                    return;
                players === null || players === void 0 ? void 0 : players.forEach(function (playerName) {
                    var finishEntry = mapEntry.topFinishes.find(function (player) { return player.name === playerName && player.time === time; });
                    if (finishEntry === undefined)
                        return;
                    finishEntry.date = date;
                });
            });
            saveRecords(records);
            saveJson(topData);
            var top10Finishes = topData.map(function (map) {
                var top10 = map.topFinishes.filter(function (finish) { return finish.rank <= 10; });
                return __assign(__assign({}, map), { topFinishes: top10 });
            });
            saveTop10Finishes(top10Finishes);
        }
        var JSDOM, window, $, jsonData, previousTopFinishes, jsonRecords, records, errors, waitFor, mapsData, topData, count, total, dataMaps, $dataMaps, $cardBodies, mapsLeft_1, startTimer, maxTime, error_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    JSDOM = require('jsdom').JSDOM;
                    window = new JSDOM('').window;
                    $ = require('jquery')(window);
                    jsonData = require('../src/data/topFinishes.json');
                    previousTopFinishes = jsonData.data;
                    jsonRecords = require('../src/data/records.json');
                    records = jsonRecords.data;
                    errors = [];
                    waitFor = function (ms) {
                        return new Promise(function (resolve) {
                            setTimeout(resolve, ms);
                        });
                    };
                    mapsData = [];
                    topData = [];
                    count = 0;
                    total = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 10]);
                    return [4 /*yield*/, getData('https://kog.tw/get.php?p=maps&p=maps')];
                case 2:
                    dataMaps = _a.sent();
                    $dataMaps = $(dataMaps);
                    $cardBodies = $dataMaps.find('.card');
                    if ($cardBodies.length === 0)
                        throw new Error('HTML parsing map cards error');
                    $cardBodies.each(parseCard);
                    total = mapsData.length;
                    mapsLeft_1 = new Set(mapsData);
                    startTimer = new Date().getTime();
                    maxTime = 20 * 60 * 1000;
                    _a.label = 3;
                case 3:
                    if (!(mapsLeft_1.size > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Promise.all(Array.from(mapsLeft_1).map(function (map) {
                            var url = "https://kog.tw/get.php?p=maps&p=maps&map=".concat(map.name);
                            return getData(url).then(function (data) {
                                var $data = $(data);
                                var $td = $data.find('td');
                                if ($td.length > 198) {
                                    throw new Error('Unexpected td length');
                                }
                                var tdArray = $td.toArray();
                                parseTd(tdArray, map);
                                count++;
                                mapsLeft_1["delete"](map);
                                console.log("Parsed ".concat(count, "/").concat(total, ": ").concat(map.name));
                            }, function (error) {
                                console.log("".concat(error.message, ". Failed to load ").concat(map.name));
                            });
                        }))];
                case 4:
                    _a.sent();
                    if (new Date().getTime() - startTimer > maxTime) {
                        throw new Error('max time exceeded');
                    }
                    if (!(mapsLeft_1.size > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, waitFor(2000)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 3];
                case 7:
                    if (count >= total) {
                        update(topData);
                    }
                    return [3 /*break*/, 10];
                case 8:
                    error_1 = _a.sent();
                    errorMessage = 'Unknown Error';
                    if (error_1 instanceof Error) {
                        errorMessage = error_1.message;
                    }
                    console.log("Fetch maps data error: ".concat(errorMessage));
                    errors.push("Fetch maps data error: ".concat(errorMessage));
                    return [3 /*break*/, 10];
                case 9:
                    saveLogs();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
})();
