const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origins: ['*']
  }
});
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const Rooms = [...Array(10).keys()].map(m => ({
  index: m,
  userInRoom: []
}))
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.emit('connection', socket.id);
  socket.on(`room-5`, (res) => {
    socket.broadcast.emit(`room-5 broadcast`, res)
  })
  
  socket.on(`room-5 newgame`, (res) => {
    socket.broadcast.emit(`room-5 newgame broadcast`, res)
  })


});
// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});