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
    
    console.log("user connected");
    
    //user connect + input name
    ctx.socket.on('input name', function(nickname){
    console.log(nickname);
    ctx.socket.nickname = nickname;
    io.broadcast('chat message', ctx.socket.nickname + " has joined.");
    
    //send message
    ctx.socket.on('chat message', function(msg){
    io.broadcast('chat message', ctx.socket.nickname + " says: " + msg);
        
  });

    //disconnect
    ctx.socket.on('disconnect', function(){
    io.broadcast('chat message', ctx.socket.nickname + " has left.");
    console.log('user disconnected');
    });


    })
    //console.log(ctx.socket)

})

const PORT = 3000
app.listen(PORT)
console.log(`listening on port ${PORT}`)
