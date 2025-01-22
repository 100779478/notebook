const Koa = require('koa')
const app = new Koa()
app.use((ctx, next) => {
    ctx.body = 'Hello Koa'
    console.log(ctx, 111)
})

app.listen(4000)