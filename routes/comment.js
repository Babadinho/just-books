const express = require('express');

const router = express.Router();

//controllers
const {
  addComment,
  getComments,
  addCommentReply,
} = require('../controllers/comment');
const { requireSignin } = require('../controllers/auth');

//routes
router.get('/comments/:bookId', getComments);
router.post('/add-comment/:userId', requireSignin, addComment);
router.post('/add-comment-reply/:userId', requireSignin, addCommentReply);

module.exports = router;
