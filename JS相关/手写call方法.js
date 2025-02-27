Function.prototype.myCall = function (ctx, ...args) {
    // 1. 确定 this 上下文
    // 如果 ctx 不是 null 或 undefined，则将其转换为对象，否则使用全局对象 (globalThis)
    ctx = (ctx !== null && ctx !== undefined) ? Object(ctx) : globalThis;

    // 2. 创建一个唯一的 Symbol 属性名，避免属性名冲突
    let key = Symbol('temp');

    // 3. 将调用函数 (this) 绑定到 ctx 对象的 key 属性上
    Object.defineProperty(ctx, key, {
        enumerable: false, // 设置为不可枚举，避免在循环中出现
        value: this // 将调用函数 (this) 赋值给属性
    });

    // 4. 调用绑定到 ctx 上的函数，并传递参数
    ctx[key](...args);

    // 5. 删除 ctx 对象上的函数属性，清理残留
    delete ctx[key];
};

const person = {
    name: 'Alice'
};

function greet(message) {
    // 6. 在函数内部打印 this 上下文
    console.log(this);

    // 7. 使用 this 上下文和传递的 message 参数输出结果
    console.log(`${message}, ${this.name}`);
}

// 8. 使用 myCall 方法调用 greet 函数，并将 1 作为 this 上下文
greet.myCall(1, 'hello');

// 解释：
//  - greet.myCall(1, 'hello') 将 greet 函数的 this 上下文设置为 1。
//  - 由于 1 是一个原始值，它会被 Object(1) 转换为一个 Number 对象。
//  - 然后，greet 函数被调用，this 指向 Number 对象，并输出 "hello, undefined"
//  - 因为Number对象没有name属性，所以this.name是undefined