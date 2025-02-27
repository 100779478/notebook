const fn = (list) => {
    // 初始化结果数组，使用 [[]] 表示初始的空集
    let result = [[]];

    // 内部函数，用于计算笛卡尔积的每一轮迭代
    function _fn(preList, curRow) {
        // 存储当前轮迭代的结果
        const dtoRes = [];

        // 遍历前一轮的结果数组
        preList.forEach(preRow => {
            // 遍历当前轮的元素数组
            curRow.forEach(curItem => {
                // 将前一轮的每个结果与当前轮的每个元素组合，并添加到结果数组中
                dtoRes.push([].concat(preRow).concat([curItem]));
            });
        });

        // 将当前轮的结果赋值给 result，作为下一轮迭代的 preList
        result = dtoRes;
    }

    // 遍历输入的列表，逐个计算笛卡尔积
    for (let i = 0; i < list.length; ++i) {
        _fn(result, list[i]);
    }

    // 将结果数组中的每个子数组转换为字符串，并用 '-' 连接
    return result.map(item => item.join('-'));
};

// 输入的列表，包含多个子列表
const arr = [
    ['戴尔', '苹果', '联想'],
    ['笔记本', '平板电脑', 'PC机', '上网本'],
    ['黑色', '银色', '白色']
];

// 调用 fn 函数，并输出结果
console.log(fn(arr));