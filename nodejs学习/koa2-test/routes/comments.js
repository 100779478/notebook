const router = require('koa-router')()

router.prefix('/api')

router.get('/list', function (ctx, next) {
    const query = ctx.query
    ctx.body = {
        error: 0,
        data: [
            {content: '留言1', user: '张三'},
            {content: '留言2', user: '赵四'},
            {content: '留言3', user: '王五'},
        ]
    }
})

router.post('/create', function (ctx, next) {
    const body = ctx.request.body
    console.log(ctx.body, body, 11111)
    ctx.body = {
        errno: 0,
        data: {},
        message: 'success'
    }
})

module.exports = router
