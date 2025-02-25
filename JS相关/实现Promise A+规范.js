const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    #state = PENDING; // Promise 的状态，初始为 pending
    #result = undefined; // Promise 的结果，初始为 undefined
    #handler = []; // 存储 then 方法的回调函数

    constructor(executor) {
        // 构造函数，接收一个 executor 函数作为参数
        const resolve = value => this.#changeState(FULFILLED, value); // resolve 函数，用于改变 Promise 状态为 fulfilled
        const reject = err => this.#changeState(REJECTED, err); // reject 函数，用于改变 Promise 状态为 rejected
        try {
            executor(resolve, reject); // 执行 executor 函数，传入 resolve 和 reject 函数
        } catch (e) {
            reject(e); // 如果 executor 函数抛出错误，则调用 reject 函数
        }
    }

    #isPromisLike(val) {
        // 判断一个值是否是 Promise-like 对象
        if (val !== null && (typeof val === 'object' || typeof val === 'function')) {
            console.log(111, typeof val.then === 'function');
            return typeof val.then === 'function'; // 如果有 then 方法，则认为是 Promise-like 对象
        }
    }

    #runMicroTask(fn) {
        // 模拟微任务队列
        if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
            // Node.js 环境
            process.nextTick(fn);
        } else if (typeof queueMicrotask === 'function') {
            // 现代浏览器环境（支持 queueMicrotask）
            queueMicrotask(fn);
        } else if (typeof MutationObserver === 'function') {
            // 浏览器环境（使用 MutationObserver 模拟微任务）
            const observer = new MutationObserver(fn);
            const textNode = document.createTextNode('1');
            observer.observe(textNode, { characterData: true });
            textNode.data = '2';
        } else {
            // 较旧的浏览器环境或不支持微任务的特殊环境
            setTimeout(fn, 0);
        }
    }

    #runOne(callback, resolve, reject) {
        // 执行一个回调函数
        this.#runMicroTask(() => {
            if (typeof callback === 'function') {
                try {
                    const data = callback(this.#result); // 执行回调函数，获取返回值
                    if (this.#isPromisLike(data)) {
                        // 如果返回值是 Promise-like 对象，则调用其 then 方法
                        data.then(resolve, reject);
                    } else {
                        // 否则，直接调用 resolve 函数
                        resolve(data);
                    }
                } catch (e) {
                    reject(e); // 如果回调函数抛出错误，则调用 reject 函数
                }
            } else {
                // 如果回调函数不是函数，则根据 Promise 的状态调用 resolve 或 reject 函数
                const settled = this.#state === FULFILLED ? resolve : reject;
                settled(this.#result);
            }
        });
    }

    #run() {
        // 执行存储的回调函数队列
        if (this.#state === PENDING) return; // 如果 Promise 状态为 pending，则不执行
        while (this.#handler.length) {
            // 循环执行回调函数
            const { onFufilled, onRejected, resolve, reject } = this.#handler.shift(); // 取出回调函数
            if (this.#state === FULFILLED) {
                this.#runOne(onFufilled, resolve, reject); // 如果 Promise 状态为 fulfilled，则执行 onFufilled 函数
            } else {
                this.#runOne(onRejected, resolve, reject); // 如果 Promise 状态为 rejected，则执行 onRejected 函数
            }
        }
    }

    #changeState(state, result) {
        // 改变 Promise 的状态和结果
        if (this.#state !== PENDING) return; // 如果 Promise 状态不是 pending，则不改变
        this.#state = state; // 改变状态
        this.#result = result; // 改变结果
        this.#run(); // 执行回调函数队列
    }

    then(onFufilled, onRejected) {
        // then 方法，用于添加回调函数
        return new MyPromise((resolve, reject) => {
            this.#handler.push({
                onFufilled,
                onRejected,
                resolve,
                reject,
            }); // 将回调函数添加到队列中
            this.#run(); // 执行回调函数队列
        });
    }
}

const p = new MyPromise((res, reject) => {
    // 创建一个 Promise 实例
    setTimeout(() => {
        res(123);
    }, 1000);
});

p.then(res => {
    // 添加 then 方法回调函数
    console.log('res执行了', res);
    return 456;
}).then(res => {
    console.log('sssss', res);
    return 666;
}).then(res => {
    console.log('sssss', res);
}).then(() => {
    return new MyPromise((res, reject) => {
        res(1);
    });
});