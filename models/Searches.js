const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    query: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('searches', BookSchema);
