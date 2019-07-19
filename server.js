

/* SIMPLE SERVER EXAMPLE
const portNum = process.env.PORT || 3000;
app.set("port", portNum);
const server = http.createServer(app);
server.listen(portNum);
*/
const debug = require("debug")("node-angular");
const http = require("http");
const app = require("./backend/app");
// const socket_io =require("socket.io");
// const serve = new http.Server(app);
// const io = socket_io.default(serve);

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
});


const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening );
server.listen(port);

const io = require('socket.io')(server);
io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
  console.log("socket connected");
  socket.on('create or join', function (event) {
    let myRoom = io.sockets.adapter.rooms[event.room] || { length: 0 };
    let numClients = myRoom.length;
    if (numClients === 0) {
        socket.join(event.room);
        socket.emit('created');
    }
    else {
        socket.join(event.room);
        socket.emit('joined');
    } 
  });

  socket.on('ready', function (room) {
    socket.broadcast.to(room).emit("ready");
  });
  
  socket.on('offer', function (event) {
    socket.broadcast.to(event.room).emit('offer', event.sdp);
  });

  socket.on('candidate', function (event) {
    socket.broadcast.to(event.room).emit('candidate', event);
  });

  socket.on('answer', function (event) {
    socket.broadcast.to(event.room).emit('answer', event.sdp);
});

});
