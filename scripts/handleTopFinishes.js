"use strict";
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
        var topFinishes = map.topFinishes, category = map.category;
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
            playerRecords[name_1].push({
                time: time,
                category: category,
                name: map.name,
                rank: currentRank + 1
            });
            playersTopRanks[name_1][category][utilities_1.RANK_TYPES[currentRank]] += 1;
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
