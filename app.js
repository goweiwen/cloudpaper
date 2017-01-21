'use strict'

const Koa = require('koa')
const logger = require('koa-logger')
const router = require('koa-router')()
const handlebars = require('koa-handlebars')
const serve = require('koa-static')
const IO = require('koa-socket')

const app = new Koa()
const io = new IO()

app.use(logger())
app.use(serve(`${__dirname}/static`))

app.use(handlebars({
    defaultLayout: 'main'
}))

app.use(function*() {
    yield this.render('index', {
        user: 'hi'
    })
})

io.attach(app)
io.on('connection', ctx => {

    console.log(ctx.data)

})

const PORT = 3000
app.listen(PORT)
console.log(`listening on port ${PORT}`)
