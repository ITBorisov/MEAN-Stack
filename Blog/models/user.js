const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);