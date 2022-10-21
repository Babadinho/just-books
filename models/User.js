const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
