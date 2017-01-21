var koa = require('koa')
var app = koa()

app.use(require('koa-static')('static', {}))

app.use(function*() {
})

app.listen(3000)
