// Node server which will handle socket io connections


const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  })
const users = {};           
//io.on is socket.io instance which will listen to multiple socket connections
//socket.on will handle the particular connection
io.on('connection', socket => {
    socket.on('new-user-joined', name=>{
        // console.log(name);
        users[socket.id] = name; // will give that name to id
        socket.broadcast.emit('user-joined', name) // will tell other people that new user has joined

    })
    //if someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
        
    })
    //if someone leaves, let others know
    socket.on('disconnect', message => {
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id]
  
  })
})

//.emit means it is emmiting the events to client.js