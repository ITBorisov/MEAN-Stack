const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true, unique: true},
  email:  { type: String, required: true, unique: true},
  
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password'))
    return next();

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err); 
    this.password = hash; 
    next(); 
  });
});

module.exports = mongoose.model('User', userSchema);