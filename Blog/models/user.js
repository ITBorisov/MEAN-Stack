const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true, unique: true},
  email:  { type: String, required: true, unique: true},
  
  
});

module.exports = mongoose.model('User', userSchema);