const http = require('http')
const server = http.createServer((req, res) => {
    const url = req.url
    const path = url.split('?')[0]
    res.end(path + '123321'+'M')
})
server.listen(3000)
console.log('server listening ddd')