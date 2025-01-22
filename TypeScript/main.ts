import * as console from "console";
import {Point} from "./point";

let number1 = 5
let number2 = 2
const number3 = 3

function add(num1: number, num2: number): number {
    return num1 + num2
}

// 数组元组
// console.log(add(number1, number2))
let list1: number[] = [1, 2, 3, 4]
let list2: Array<number> = [1, 2, 3, 4]
let list3 = [1, 2, 3, 4]
let list4 = [1, '2']
let list5: any[] = [1, '2', true, {}]

// 固定长度固定类型的tuple元组（数组） 元组.push会突破界限
let person1: [number, string] = [1, "alex"]
// console.log(person1[0])

// 联合（Union）与字面量（Literal）类型
// 联合类型
let union: string | number
union = 2
union = '123'
let union2: string | number | boolean | number[]

function merge(n1: number | string, n2: number | string, resultType: "as-number" | "as-string") {
    if (resultType === 'as-string') {
        return n1.toString() + n2.toString()
    }
    if (typeof n1 === 'string' || typeof n2 === "string") {
        return n1.toString() + n2.toString()
    } else return n1 + n2
}

let mergeNumber = merge(2, 4, "as-number")
let mergeNumber2 = merge(22, 5, "as-string")
let mergeString = merge('hello', 'world', "as-string")
// 字面量类型
let union3: 0 | 1 | 2 | 3
let literal: 0 | 'hello' | true | [1, 2, 3, 4]

// 枚举类型 Enum
enum Color {
    red,
    green,
    blue
}

// enum Color {
//     red = 'a',
//     green = 'c',
//     blue = 'v'
// }
let color = Color.red
// console.log(color)

// any和Unknown
// any支持任意类型
let randomValue: any = 666
randomValue = true
randomValue = 'as'
randomValue = {}
// randomValue()
// randomValue.toUpperCase()

let randomKey: unknown = 888
if (typeof randomKey === 'string') {
    randomKey.toUpperCase()
}


// void、undefined与never
function printResult() {
    return console.log("lalala")
}

// console.log(printResult(), 999)

function throwError(message: string, errorCode: number) {
    // throw抛出后直接接熟，永远没有return，这就是never
    throw {
        message,
        errorCode
    }
}

// throwError('not found', 404)

// 类型适配（类型断言）Type Assertions
let message: any
message = 'abc'
// message.endsWith('c')
// 类型断言后可以使用方法
// let ddd = (<string>message).endsWith('c')
let ddd = (<string>message).toUpperCase()
console.log(ddd)
let aaa = (message as string).toUpperCase()
console.log(aaa)

// 函数类型
let log = function (message) {
    console.log(message)
}
let log2 = (message: string) => {
    console.log(message)
}
log2('123')
// 可选值：?:可以设置可选性，默认设为undefined
// 默认值：count:number=0代表默认值为0
// 可选值和默认值只能写在参数末尾
let log3 = (message: string, code?: number, count: number = 0) => {
    console.log(message, code)
}
log3('123', 2)


// 对象object:key to type
// const person:object = {}  等同于指定了person:{}
// object是any类型的子集
const person: {
    firstName: string,
    lastName: string,
    age: number,
    class: any
} = {
    firstName: "jackson",
    lastName: "tom",
    age: 18,
    class: undefined
}
console.log(person.class)

// interface类型
// 定义一个接口类型
// 高内聚低耦合：功能相关的放在同一个模块，每个模块又是独立的
// let drawPoint = (point: Point) => {
//     console.log({x: point.x, y: point.y})
// }
// drawPoint({x: 105, y: 24, type: 'add'})

// interface Point {
//     x: number,
//     y: number,
//     type: string
// }

// Class类
// interface IPoint {
//     x: number,
//     y: number,
//     drawPoint: () => void,
//     getDistance: (p: IPoint) => number,
//     // getX: () => number,
//     // getY: () => number,
//     // setX: (value: number) => void,
//     // setY: (value: number) => void
// }
//
// class Point implements IPoint {
//     // x: number
//     // y: number
//     // 使用访问修饰符可以自动声明变量并赋默认值
//     constructor(private _x: number, private _y: number = 2) {
//         // this.x = x
//         // this.y = y
//     }
//
//     drawPoint = () => {
//         console.log("x:", this._x, "y:", this._y)
//     }
//     getDistance = (p: IPoint) => {
//         return Math.pow(p.x - this._x, 2) + Math.pow(p.y - this._y, 2)
//         // return 0
//     }
//
//     get x(): number {
//         return this._x;
//     }
//
//     set x(value: number) {
//         this._x = value;
//     }
//
//     get y(): number {
//         return this._y;
//     }
//
//     set y(value: number) {
//         this._y = value;
//     }
// }
//
// // const point = new Point(2, 3)
// // point.drawPoint()
//
// // Access Modifier 访问修饰符
// const point = new Point(1, 2)
// const point2 = new Point(3, 4)
// console.log('interface:', point.getDistance(point2), point, point2)
// 直接操作class内部属性十分危险
// point.y = 3
// point.setX(1)
// console.log(point.getX())
// public private protected

// Module模块 ： 如何将大量文件依次组合起来
//  如文件夹中point.ts

// import {Point} from "./point";

// const point1 = new Point(2, 3)
// console.log(point1)


// Generic 泛型 :类似于模板
// let listArr1: number[] = [1, 2, 3, 4, 5]
// let listArr2: Array<number> = [1, 2, 3, 4, 5]
// let listArr3: Array<string> = [1, 2, 3, 4, 5]
// console.log(listArr1, listArr2, 99999)
// T可以是任意字母，约定俗成一般都写T
// const lastInList = <T>(arr: T[]) => {
//     return arr[arr.length - 1]
// }
// const a = lastInList([1, 2, 3, 4])
// const b = lastInList(["1", "4", "7"])
// const c = lastInList<string | number>(["1", 2, "4"])
// console.log(77772222, a)
// let makeTuple = <T, Y>(x: T, y: Y) => [x, y]
// const makeTupleExample1 = makeTuple(1, false)
// const makeTupleExample2 = makeTuple<string, boolean>("oi", false)
// console.log(makeTupleExample2)


// 类型守卫：TypeGuards
type Square = {
    size: number,
}
type Rectangle = {
    width: number,
    height: number
}
type Shape = Square | Rectangle

function isSquare(shape: Shape): shape is Square {
    return "size" in shape
}

function isRectangle(shape: Shape): shape is Rectangle {
    return "width" in shape
}

function area(shape: Shape) {
    if (isSquare(shape)) {
        // 若函数中没有明确返回类型，则shape不知道是长方形还是正方形，所以在函数返回的时候需要返回对应的类型，这样类型守护才不会失效
        return shape.size * shape.size
    }
    if (isRectangle(shape)) {
        return shape.width * shape.height
    } else {
        return 0
    }
}


console.log(area({size: 2}),
    area({width: 2, height: 7})
)


// 函数重载 Function Overloading
// 在typescript中的重载是在编译时运行的，而不是在运行时！！！
// 函数重载声明不会影响输入
function reverse(string: string): string
function reverse(arr: string[]): string[]
function reverse(string: string | string[]) {
    if (typeof string === 'string') {
        return string.split('').reverse().join('')
    } else {
        return string.reverse()
    }
}

const reverseList1 = reverse('jackson')
const reverseList2 = reverse(['1', '2', '3', '4'])

function makeDate(timeStampOrYear: number)
function makeDate(year: number, month: number, day: number)
function makeDate(timeStampOrYear: number, month?: number, day?: number) {
    if (month !== null && day !== null) {
        return new Date(timeStampOrYear, month - 1, day)
    } else {
        return new Date(timeStampOrYear)
    }
}

makeDate(1989, 2, 11)
makeDate(198912378664)
// makeDate(1989, 2)


// 调用签名 Call Signatures
// type Add = (a: number, b: number) => number
type Add = {
    (a: number, b: number): number // 等同于type Add = (a: number, b: number) => number
    (a: number, b: number, c: number): number // 可以函数重载
    debugName: string
}
const callSignaturesAdd: Add = (a, b, c?: number) => {
    return a + b + (c !== null ? c : 0)
}
callSignaturesAdd.debugName = '附加信息'
// 使用new 构造函数
// type Point = new (x: number, y: number) => { x: number, y: number }
type Point = {
    new(x: number, y: number): { x: number, y: number }
}
const point = class {
    constructor(public x: number, public y: number) {
    }
}

// 索引签名 Index Signatures
type Dictionary = {
    [key: string]: boolean
}
type Person = {
    name: string
    email: string
}
// type School = {
//     class: string
// }
type PersonDictionary = {
    [username: string]: Person
    // [school: string]: School
}
const persons: PersonDictionary = {
    alex: {
        name: 'jackson',
        email: '2222@qq.com'
    },
    // binjiang: {
    //     class: '一年级'
    // }
}
// console.log(23333, persons['alex'])

// readonly 只读
// 副作用side-effect：一个函数处理了与返回值无关的事情
function reverseSorted(input: readonly number[]): number[] {

    // return input.sort().reverse()
    // return input.slice().sort().reverse()
    return [...input].sort().reverse()
}

const started = [1, 2, 3, 4, 5]
const startedResult = reverseSorted(started)
// console.log(88888, started, startedResult)

// 双重断言Double Assertion
type Point2D = {
    x: number
    y: number
}
type Point3D = {
    x: number
    y: number
    z: number
}
let point2: Point2D = ({x: 1, y: 2})
let point3: Point3D = ({x: 1, y: 2, z: 3})
point2 = point3
// point3=point2 //error
point3 = point2 as Point3D
point3 = person as any as Point3D // 双重断言，先转换为any，再进行断言处理

// 常量断言 对象声明后加 as const 可断言任何一个类型


