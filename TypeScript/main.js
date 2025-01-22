"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console = require("console");
var number1 = 5;
var number2 = 2;
var number3 = 3;
function add(num1, num2) {
    return num1 + num2;
}
// 数组元组
// console.log(add(number1, number2))
var list1 = [1, 2, 3, 4];
var list2 = [1, 2, 3, 4];
var list3 = [1, 2, 3, 4];
var list4 = [1, '2'];
var list5 = [1, '2', true, {}];
// 固定长度固定类型的tuple元组（数组） 元组.push会突破界限
var person1 = [1, "alex"];
// console.log(person1[0])
// 联合（Union）与字面量（Literal）类型
// 联合类型
var union;
union = 2;
union = '123';
var union2;
function merge(n1, n2, resultType) {
    if (resultType === 'as-string') {
        return n1.toString() + n2.toString();
    }
    if (typeof n1 === 'string' || typeof n2 === "string") {
        return n1.toString() + n2.toString();
    }
    // @ts-ignore
    else
        return n1 + n2;
}
var mergeNumber = merge(2, 4, "as-number");
var mergeNumber2 = merge(22, 5, "as-string");
var mergeString = merge('hello', 'world', "as-string");
// 字面量类型
var union3;
var literal;
// 枚举类型 Enum
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
// enum Color {
//     red = 'a',
//     green = 'c',
//     blue = 'v'
// }
var color = Color.red;
// console.log(color)
// any和Unknown
// any支持任意类型
var randomValue = 666;
randomValue = true;
randomValue = 'as';
randomValue = {};
// randomValue()
// randomValue.toUpperCase()
var randomKey = 888;
if (typeof randomKey === 'string') {
    randomKey.toUpperCase();
}
// void、undefined与never
function printResult() {
    return console.log("lalala");
}
// console.log(printResult(), 999)
function throwError(message, errorCode) {
    // throw抛出后直接接熟，永远没有return，这就是never
    throw {
        message: message,
        errorCode: errorCode
    };
}
// throwError('not found', 404)
// 类型适配（类型断言）Type Assertions
var message;
message = 'abc';
// message.endsWith('c')
// 类型断言后可以使用方法
var ddd = message.endsWith('c');
console.log(ddd);
var aaa = message.toUpperCase();
console.log(aaa);
// 函数类型
var log = function (message) {
    console.log(message);
};
var log2 = function (message) {
    console.log(message);
};
log2('123');
// 可选值：?:可以设置可选性，默认设为undefined
// 默认值：count:number=0代表默认值为0
// 可选值和默认值只能写在参数末尾
var log3 = function (message, code, count) {
    if (count === void 0) { count = 0; }
    console.log(message, code);
};
log3('123', 2);
// 对象object:key to type
// const person:object = {}  等同于指定了person:{}
// object是any类型的子集
var person = {
    firstName: "jackson",
    lastName: "tom",
    age: 18,
    class: undefined
};
console.log(person.class);
function isSquare(shape) {
    return "size" in shape;
}
function isRectangle(shape) {
    return "width" in shape;
}
function area(shape) {
    if (isSquare(shape)) {
        // 若函数中没有明确返回类型，则shape不知道是长方形还是正方形，所以在函数返回的时候需要返回对应的类型，这样类型守护才不会失效
        return shape.size * shape.size;
    }
    if (isRectangle(shape)) {
        return shape.width * shape.height;
    }
}
console.log(area({ size: 2 }), area({ width: 2, height: 7 }));
function reverse(string) {
    if (typeof string === 'string') {
        return string.split('').reverse().join('');
    }
    else {
        return string.reverse();
    }
}
var reverseList1 = reverse('jackson');
var reverseList2 = reverse(['1', '2', '3', '4']);
function makeDate(timeStampOrYear, month, day) {
    if (month !== null && day !== null) {
        return new Date(timeStampOrYear, month - 1, day);
    }
    else {
        return new Date(timeStampOrYear);
    }
}
makeDate(1989, 2, 11);
makeDate(198912378664);
var callSignaturesAdd = function (a, b, c) {
    return a + b + (c !== null ? c : 0);
};
callSignaturesAdd.debugName = '附加信息';
var point = /** @class */ (function () {
    function class_1(x, y) {
        this.x = x;
        this.y = y;
    }
    return class_1;
}());
var persons = {
    alex: {
        name: 'jackson',
        email: '2222@qq.com'
    },
    // binjiang: {
    //     class: '一年级'
    // }
};
// console.log(23333, persons['alex'])
// readonly 只读
function reverseSorted(input) {
    return input.sort().reverse();
}
var started = [1, 2, 3, 4, 5];
var startedResult = reverseSorted(started);
console.log(88888, started, startedResult);
