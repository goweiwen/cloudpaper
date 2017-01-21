'use strict'

const koa = require('koa')
const logger = require('koa-logger')
const Router = require('koa-router')
const render = require('koa-ejs')
const server = require('koa-static')
const IO = require('koa-socket')

const app = koa()
const io = new IO()

app.use(logger())
app.use(server(`${__dirname}/static`))

render(app, {
    root: `${__dirname}/view`,
    layout: 'index',
    viewExt: 'ejs',
    debug: true,
    cache: false
})

app.use(function*(next) {
    // Use PDF.js like this:
    // http://localhost:3000/web/viewer.html?file=/pdf/CS2100.pdf

    yield this.render('index', { })
})

io.attach(app)

io.on('connection', socket => console.log('someone joined!'))

io.on('message', console.log)

const PORT = 3000
app.listen(PORT)
console.log(`listening on port ${PORT}`)
