/**
 * 柯里化函数，实现累加功能
 * @param {...number} args1 初始参数列表
 * @returns {Function} 返回一个可以继续接收参数的函数，或者通过 valueOf 获取累加结果
 */
function curry(...args1) {
    // 使用闭包保存参数列表
    let params = args1;

    /**
     * 内部函数，用于接收后续参数
     * @param {...number} args2 后续参数列表
     * @returns {Function} 返回自身，支持链式调用
     */
    const addFn = (...args2) => {
        // 将后续参数合并到参数列表中
        params = params.concat(args2);
        // 返回自身，支持链式调用
        return addFn;
    };

    /**
     * valueOf 方法，用于获取累加结果
     * @returns {number} 累加结果
     */
    addFn.valueOf = () => {
        // 使用 reduce 方法计算参数列表的总和
        return params.reduce((acc, cur) => {
            // acc: 累加器，cur: 当前元素
            return acc + cur;
        }, 0); // 初始累加值为 0
    };

    // 返回内部函数，支持链式调用和 valueOf 获取结果
    return addFn;
}

// 测试用例
console.log(curry(1, 2, 3).valueOf()); // 6
console.log(curry(1, 2)(3)(4, 5).valueOf()); // 15
console.log(curry(1)(2)(3)(4, 5, 6)(7).valueOf()); // 28