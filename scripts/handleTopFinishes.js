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
var utilities_1 = require("../src/utilities/utilities");
(function () {
    var jsonData = require('./data/topFinishes.json');
    var lastUpdateDate = jsonData.date;
    var maps = jsonData.data;
    var playerRecords = {};
    var playersTopRanks = {};
    function initRankTypes() {
        return {
            'rank 1': 0,
            'rank 2': 0,
            'rank 3': 0,
            'rank 4': 0,
            'rank 5': 0
        };
    }
    function initMapTypes() {
        return {
            Easy: initRankTypes(),
            Main: initRankTypes(),
            Hard: initRankTypes(),
            Insane: initRankTypes(),
            Mod: initRankTypes(),
            Extreme: initRankTypes(),
            Total: initRankTypes(),
            Solo: initRankTypes()
        };
    }
    function addNewPlayer(name) {
        var categories = initMapTypes();
        playersTopRanks[name] = categories;
        playerRecords[name] = [];
    }
    function handleMap(map) {
        var topFinishes = map.topFinishes, rest = __rest(map, ["topFinishes"]);
        var currentRank = 0;
        var previousTime = -1;
        for (var i = 0; i < topFinishes.length; i++) {
            var _a = topFinishes[i], name_1 = _a.name, time = _a.time;
            if (time !== previousTime) {
                currentRank = i;
            }
            if (currentRank >= 5)
                break;
            if (playersTopRanks[name_1] === undefined) {
                addNewPlayer(name_1);
            }
            playerRecords[name_1].push(__assign(__assign({}, rest), { time: time, rank: currentRank + 1 }));
            playersTopRanks[name_1][map.category][utilities_1.RANK_TYPES[currentRank]] += 1;
            playersTopRanks[name_1]['Total'][utilities_1.RANK_TYPES[currentRank]] += 1;
            previousTime = time;
        }
    }
    function convertPlayersTopRanksToArray() {
        var playersArray = [];
        for (var player in playersTopRanks) {
            var playerObject = {
                name: player,
                categories: playersTopRanks[player]
            };
            playersArray.push(playerObject);
        }
        return playersArray;
    }
    maps.forEach(handleMap);
    var playersTopRanksArray = convertPlayersTopRanksToArray();
    var result = {
        date: lastUpdateDate,
        topRanks: playersTopRanksArray.sort((0, utilities_1.comparePlayers)('Total')).reverse()
    };
    var fs = require('fs');
    var json = JSON.stringify(result);
    var playerRecordsJson = JSON.stringify(playerRecords);
    fs.writeFile('../src/data/topRanks.json', json, function (error) {
        if (error)
            return error;
    });
    fs.writeFile('../src/data/playerRecords.json', playerRecordsJson, function (error) {
        if (error)
            return error;
    });
})();
