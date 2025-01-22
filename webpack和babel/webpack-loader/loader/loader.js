module.exports = function (source) {
    let logCount = 0;  // 用于统计 console.log 的次数
    console.log('this is loader', source);  // 打印原始文件内容，帮助调试
    // 正则表达式匹配所有的 console 语句（包括 console.log、console.error 等）
    const consoleRegex = /console\.(log|warn|error|info|debug|trace|table)\s*\(.*?\);?/g;
    const updatedSource = source.replace(consoleRegex, () => {
        logCount += 1;  // 每次遇到 console.log，就增加计数
        return '';  // 替换原始的 console.log 为带有计数的 version
    });

    // 输出统计的 logCount，可以通过日志查看总数
    console.log(`Total console.log count so far: ${logCount}`);

    // 返回更新后的源代码
    return updatedSource;
};
