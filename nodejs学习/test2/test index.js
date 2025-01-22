const http = require('http')
const queryString = require('querystring')
const server = http.createServer((req, res) => {
    const url = req.url
    const queryStr = url.split('?')[1]
    const path = url.split('?')[0]
    const query = queryString.parse(queryStr || '')
    const method = req.method
    console.log('URL:', url, 'method:', req.method, 'path:', path, 'query:', JSON.stringify(query))
    // 定义路由
    if (path === '/api/list' && method === 'GET') {
        if (query.filterType === '1') {
            const result = {
                data:{
                    list:[1,2,3,4,5]
                }
            }
            res.end(JSON.stringify(result))
        } else if (query.filterType === '2') {
            res.end('this is list router,only mine')
        }
    } else if (path === '/api/create' && method === 'POST') {
        res.end('this is create router')
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
            <style>
            div{
            color: #007bff;
            }
            </style>
        <body>
            <h1>666</h1>
            <div>测试</div>
        </body>
        </html>
        `)
    }
})
server.listen(3001) // 监听http请求
console.log('http 请求已经被监听，3001端口')