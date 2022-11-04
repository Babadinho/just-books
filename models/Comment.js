const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    bookId: {
      type: String,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', CommentSchema);
