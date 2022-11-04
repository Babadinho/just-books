const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    id: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'list',
    },
    volumeInfo: {
      title: {
        type: String,
      },
      authors: [
        {
          type: String,
        },
      ],
      publisher: {
        type: String,
      },
      publishedDate: {
        type: String,
      },
      averageRating: {
        type: Number,
      },
      imageLinks: {
        type: Object,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('book', BookSchema);
