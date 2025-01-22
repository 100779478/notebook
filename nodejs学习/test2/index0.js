const http = require('http')
const queryString = require('querystring')
const server = http.createServer((req, res) => {
    const url = req.url
    const path = url.split('?')[0]
    const queryStr = url.split('?')[1]
    const method = req.method
    // console.log(path, method)

    // 解析queryString
    // let query = {
    //     filterType: undefined
    // }
    // queryStr && queryStr.split('&').forEach((e, index) => {
    //     const key = e.split('=')[0]
    //     query[key] = e.split('=')[1]
    // })
    const query = queryString.parse(queryStr || '')
    // 定义路由：模拟获取留言板列表
    if (path === '/api/list' && method === 'GET') {
        if (query.filterType === '1') {
            res.end('this is list router')
        } else if (query.filterType === '2') {
            res.end('this is list router,only mine')
        }
    }
    // 定义路由：模拟创建留言
    else if (path === '/api/create' && method === 'POST') {
        res.end('this is create router')
    } else {
        res.end('404')
    }
})
server.listen(3000) // 监听http请求
console.log('http 请求已经被监听，3000端口')