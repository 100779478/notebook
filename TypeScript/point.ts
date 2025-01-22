interface IPoint {
    x: number,
    y: number,
    drawPoint: () => void,
    getDistance: (p: IPoint) => number,
}

export class Point implements IPoint {
    constructor(private _x: number, private _y: number = 2) {
        // this.x = x
        // this.y = y
    }

    drawPoint = () => {
        console.log("x:", this._x, "y:", this._y)
    }
    getDistance = (p: IPoint) => {
        return Math.pow(p.x - this._x, 2) + Math.pow(p.y - this._y, 2)
        // return 0
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
}

const point = new Point(1, 2)
const point2 = new Point(3, 4)
// console.log('interface:', point.getDistance(point2), point, point2)
