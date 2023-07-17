const Message = require('./models/Message');
module.exports = function (io) {
  
  
  let nicknames = [];
 
io.on('connection', socket => {
    console.log('new user connected');

    socket.on('new user', (data, cb) => {
      console.log(data);
      if (nicknames.indexOf(data) != -1) {
        cb(false);
      } else {
        cb(true);
        socket.nickname = data;
        nicknames.push(socket.nickname);
        updateNicknames();
      }
    });

    socket.on('send message', data => {
    let timestamp = new Date();
    let message = new Message({
    msg: data,
    nick: socket.nickname,
    timestamp: timestamp
  });
  message.save(err => {
    if (err) {
      console.log(err);
    } else {
      io.sockets.emit('new message', {
        msg: data,
        nick: socket.nickname,
        timestamp: timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds()
      });
    }
  });
});


socket.on('send image', data => {
  io.sockets.emit('new image', { image: data, nick: socket.nickname });
});

    
    socket.on('disconnect', data => {
      if(!socket.nickname) return;
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      updateNicknames();
  });

  function updateNicknames() {
    io.sockets.emit('usernames', nicknames);
}
Message.find({}, (err, messages) => {
  if (err) {
    console.log(err);
  } else {
    socket.emit('load old msgs', messages);
  }
});
});
}
