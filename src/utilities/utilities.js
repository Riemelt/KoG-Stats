"use strict";
exports.__esModule = true;
exports.comparePlayers = exports.MAP_TYPES = exports.RANK_TYPES = void 0;
var RANK_TYPES = ["rank 1", "rank 2", "rank 3", "rank 4", "rank 5"];
exports.RANK_TYPES = RANK_TYPES;
var MAP_TYPES = ["Total", "Insane", "Hard", "Main", "Easy", "Mod"];
exports.MAP_TYPES = MAP_TYPES;
function comparePlayersRanks(a, b, mapType, rank) {
    if (rank >= RANK_TYPES.length)
        return 0;
    var rankType = RANK_TYPES[rank];
    if (a.categories[mapType][rankType] !== b.categories[mapType][rankType]) {
        return a.categories[mapType][rankType] - b.categories[mapType][rankType];
    }
    return comparePlayersRanks(a, b, mapType, rank + 1);
}
function comparePlayers(mapType) {
    return function (a, b) {
        return comparePlayersRanks(a, b, mapType, 0);
    };
}
exports.comparePlayers = comparePlayers;
