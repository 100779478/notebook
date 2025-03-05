const axios = require('axios');

/**
 * 并发请求工具函数，限制最大并发数
 * @param {string[]} urls - 需要请求的 URL 数组
 * @param {number} max - 最大并发数
 * @returns {Promise<any[]>} - 返回所有请求结果的 Promise
 */
function multiRequest(urls, max) {
    return new Promise((resolve) => {
        let urlIndex = 0;        // 当前处理的 URL 索引
        let doneCount = 0;       // 已完成的请求计数
        const result = [];       // 存储所有请求的结果

        /**
         * 内部递归请求函数，处理单个 URL 请求
         */
        function _request() {
            // 如果没有更多 URL，直接返回，停止递归
            const url = urls[urlIndex];
            if (!url) return;

            // 使用闭包保存当前索引，避免异步覆盖
            (function (reqIndex) {
                console.log(`请求${reqIndex}:${url}----`);
                // 发送 GET 请求，附带 reqIndex 参数用于调试或标识
                axios.get(`${url}?reqIndex=${reqIndex}`)
                    .then(res => {
                        console.log(`响应${reqIndex}`, res.data);
                        result[reqIndex] = res.data;  // 按顺序存储响应数据
                        doneCount++;                  // 完成计数递增

                        // 如果所有请求完成，resolve 结果
                        if (doneCount === urls.length) {
                            resolve(result);
                        } else {
                            _request();  // 否则继续处理下一个 URL
                        }
                    })
                    .catch(err => {
                        console.error(`请求${reqIndex}失败`, err);
                        result[reqIndex] = null;  // 失败时存入 null
                        doneCount++;

                        if (doneCount === urls.length) {
                            resolve(result);
                        } else {
                            _request();
                        }
                    });
            })(urlIndex++);  // 每次调用后索引递增
        }

        // 启动初始并发请求，数量为 urls.length 和 max 的较小值
        for (let i = 0; i < Math.min(urls.length, max); ++i) {
            _request();
        }

        // 如果 urls 为空，直接 resolve 空数组
        if (urls.length === 0) {
            resolve([]);
        }
    });
}

// 示例用法
multiRequest([
    'http://127.0.0.1:3000/api/data',
    'http://127.0.0.1:3000/api/data',
    'http://127.0.0.1:3000/api/data',
    'http://127.0.0.1:3000/api/data',
], 3).then(res => {
    console.log('所有请求完成', res);
}).catch(err => {
    console.error('请求过程中发生错误', err);
});