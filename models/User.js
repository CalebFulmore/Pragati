const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
