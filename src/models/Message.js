const mongoose = require('mongoose');
 const MessageSchema = new mongoose.Schema({
  nick: String,
  msg: String,
  timestamp: String
});
 module.exports = mongoose.model('Message', MessageSchema);