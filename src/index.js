
const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

//settings
app.set('port', process.env.PORT || 3000);
require('./sockets')(io);


app.use(express.static(path.join(__dirname, 'public')));

//Conexión de mi app a mongodb
const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Connected to MongoDB'));




server.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});




