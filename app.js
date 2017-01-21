var koa = require('koa')
var app = koa()

app.use(require('koa-static')('static', {}))

app.use(function*() {
    this.body = 'Hello World'
})

app.listen(3000)
