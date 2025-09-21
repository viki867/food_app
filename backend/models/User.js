const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  mobile: String,
  address: String,
   email: String 
});

module.exports = mongoose.model('login', UserSchema);
