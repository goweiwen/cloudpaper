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

var pdf = [
  {
    id: 0,
    url: '/pdf/CS2100.pdf',
    num: 1,
    x: 0,
    y: 0
  },
  {
    id: 1,
    url: '/pdf/ST2131.pdf',
    num: 1,
    x: 0,
    y: 0
  }
]

io.attach(app)
io.on('connection', ctx => {

  const socket = ctx.socket;

  console.log("user connected");

  //user connect + input name
  socket.on('input name', function(nickname){
    console.log(nickname);
    socket.nickname = nickname;
    io.broadcast('chat message', socket.nickname + " has joined.");

  });

  //send message
  socket.on('chat message', function(msg){
    io.broadcast('chat message', socket.nickname + " says: " + msg);

  });

  //disconnect
  socket.on('disconnect', function(){
    io.broadcast('chat message', socket.nickname + " has left.");
    console.log('user disconnected');
  });

  //send pdf states
  socket.emit('initialise', pdf);

  //pdf page
  socket.on('pdf page', function(data) {
    const {id, num} = data

    if (pdf[id] == null) return;

    pdf[id].num = num

    socket.broadcast.emit('pdf page', {
      id: id,
      num: num
    })
  })

  //pdf move
  socket.on('pdf move', function(data) {
    const {id, x, y} = data

    if (pdf[id] == null) return;

    pdf[id].x = x;
    pdf[id].y = y;

    socket.broadcast.emit('pdf move', {
      id: id,
      x: x,
      y: y
    })
  })

  //pdf upload
  socket.on('upload file', function(data) {
    const id = pdf.length

    pdf[id] = {
      id: id,
      url: `/pdf/${data}`, // UNSAFE
      x: 0,
      y: 0,
      num: 1
    }

    io.broadcast('initialise', pdf)
  })

});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`listening on port ${PORT}`);
