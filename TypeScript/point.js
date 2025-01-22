"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(_x, _y) {
        var _this = this;
        if (_y === void 0) { _y = 2; }
        this._x = _x;
        this._y = _y;
        this.drawPoint = function () {
            console.log("x:", _this._x, "y:", _this._y);
        };
        this.getDistance = function (p) {
            return Math.pow(p.x - _this._x, 2) + Math.pow(p.y - _this._y, 2);
            // return 0
        };
        // this.x = x
        // this.y = y
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    return Point;
}());
exports.Point = Point;
var point = new Point(1, 2);
var point2 = new Point(3, 4);
// console.log('interface:', point.getDistance(point2), point, point2)
