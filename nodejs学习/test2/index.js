const http = require('http')
const server = http.createServer((req, res) => {
    const url = req.url
    const path = url.split('?')[0]
    const method = req.method
    // 数据为json格式
    res.writeHead(200, {'Content-type': 'application/json'})
    // 定义路由：模拟获取留言板列表
    if (path === '/api/list' && method === 'GET') {
        const result = {
            error: 0,
            data: [
                {user: 'zhangSan', content: '留言1'},
                {user: 'liSi', content: '留言1'},
            ]
        }
        res.end(JSON.stringify(result))
    }
    // 定义路由：模拟创建留言
    else if (path === '/api/create' && method === 'POST') {
        let bodyStr = ''
        req.on('data', chunk => { // 服务端怎么识别流，并接收数据
            // chunk即“流”的每一段数据
            bodyStr = chunk.toString()
        })
        req.on('end', () => { // 服务端怎么知道流完了
            console.log('bodyStr is ', bodyStr)
            res.end('接收完成')
        })
        // const result = {
        //     error: 0,
        //     message: '创建成功'
        // }
        // res.end(JSON.stringify(result))
    } else {
        // res.writeHead(404, {'Content-type': 'text/plain'})
        // res.end('404 Not Found')
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>123321</title>    
            </head>
        <body>
            <h1>666</h1>
        </body>
        </html>
        `)
    }
})
server.listen(3000) // 监听http请求
console.log('http 请求已经被监听，3000端口')