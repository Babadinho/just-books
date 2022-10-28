const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('list', BookSchema);
