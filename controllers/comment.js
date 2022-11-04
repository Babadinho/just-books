const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ bookId: req.params.bookId })
      .sort({
        createdAt: 'ascending',
      })
      .populate([
        { path: 'replies', populate: { path: 'user' } },
        { path: 'user' },
      ])
      .exec();
    if (comments) {
      res.json(comments);
    }
  } catch (error) {
    res.status(400).send('Error Loading comments');
  }
};

exports.addComment = async (req, res) => {
  try {
    const { commentDetails } = req.body;

    // validate fields
    if (!commentDetails.comment)
      return res.status(400).send('Field cannot be empty');

    const newComment = new Comment({
      comment: commentDetails.comment,
      user: req.params.userId,
      bookId: commentDetails.bookId,
    });

    await newComment.save();

    const comments = await Comment.find({ bookId: commentDetails.bookId })
      .populate('user')
      .exec();
    if (comments) {
      res.json(comments);
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.addCommentReply = async (req, res) => {
  try {
    const { commentDetails } = req.body;

    // validate fields
    if (!commentDetails.comment)
      return res.status(400).send('Field cannot be empty');

    const newComment = new Comment({
      bookId: commentDetails.bookId,
      comment: commentDetails.comment,
      user: req.params.userId,
      parentId: commentDetails.commentId,
    });

    await newComment.save();

    const comment = await Comment.findOne({
      _id: commentDetails.commentId,
    }).exec();
    comment.replies.push(newComment._id);
    await comment.save();

    const comments = await Comment.find({ bookId: commentDetails.bookId })
      .populate('user')
      .exec();
    if (comments) {
      res.json(comments);
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};
