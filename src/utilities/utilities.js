"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.debounceLast = exports.buildUrlPath = exports.convertTime = exports.comparePlayersRanks = exports.comparePlayers = exports.MAP_TYPES = exports.RANK_TYPES = void 0;
var RANK_TYPES = [
    'rank 1',
    'rank 2',
    'rank 3',
    'rank 4',
    'rank 5',
];
exports.RANK_TYPES = RANK_TYPES;
var MAP_TYPES = [
    'Total',
    'Extreme',
    'Insane',
    'Hard',
    'Main',
    'Easy',
    'Solo',
    'Mod',
];
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
exports.comparePlayersRanks = comparePlayersRanks;
function comparePlayers(mapType) {
    return function (a, b) {
        return comparePlayersRanks(a, b, mapType, 0);
    };
}
exports.comparePlayers = comparePlayers;
function convertTime(time) {
    var ms = Math.round((time * 100) % 100);
    var secCount = Math.floor(time);
    var hours = Math.floor(secCount / 3600);
    var minutes = Math.floor(secCount / 60) % 60;
    var seconds = secCount % 60;
    var result = [hours, minutes, seconds, ms]
        .map(function (v) { return (v < 10 ? '0' + v : v); })
        .filter(function (v, i) { return v !== '00' || i > 0; })
        .reduce(function (acc, value, index, array) {
        var separator = index + 1 !== array.length ? ':' : '.';
        return index === 0 ? "".concat(value) : "".concat(acc).concat(separator).concat(value);
    }, '');
    return result;
}
exports.convertTime = convertTime;
function buildUrlPath(path) {
    var newPath = location.pathname.split('/');
    newPath[newPath.length - 1] = path;
    return newPath.join('/');
}
exports.buildUrlPath = buildUrlPath;
var debounceLast = function (f, ms) {
    var timer;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function () {
            f.call.apply(f, __spreadArray([_this], args, false));
            clearTimeout(timer);
        }, ms);
    };
};
exports.debounceLast = debounceLast;
