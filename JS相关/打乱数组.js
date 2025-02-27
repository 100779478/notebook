/**
 * 使用 Fisher-Yates 洗牌算法打乱数组（Durstenfeld 优化版本）
 * @param {Array} arr 要打乱的数组
 * @returns {Array} 打乱后的数组（原地修改）
 */
function shuffleArray(arr) {
    // 从数组末尾开始向前遍历
    for (let i = arr.length - 1; i > 0; i--) {
        // 随机选择一个索引 j，范围从 0 到 i（包括 i）
        const j = Math.floor(Math.random() * (i + 1));

        // 交换 arr[i] 和 arr[j] 的值
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 示例
const myArray1 = [1, 2, 3, 4, 5];
shuffleArray(myArray1);
console.log("Fisher-Yates 打乱结果:", myArray1);

/**
 * 使用 sort() 方法和随机比较函数打乱数组
 * @param {Array} arr 要打乱的数组
 * @returns {Array} 打乱后的数组（原地修改）
 */
function shuffleArraySort(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// 示例
const myArray2 = [1, 2, 3, 4, 5];
shuffleArraySort(myArray2);
console.log("sort() 打乱结果:", myArray2);