const express = require('express');

const router = express.Router();

//controllers
const {
  addBook,
  removeBook,
  getBooks,
  getUserBooks,
  getActiveListBooks,
} = require('../controllers/book');
const { requireSignin } = require('../controllers/auth');

//routes
router.post('/add-book/:userId', requireSignin, addBook);
router.post('/remove-book/:userId', requireSignin, removeBook);
router.get('/books', getBooks);
router.get('/books/:userId', requireSignin, getUserBooks);
router.post('/active-list-books/:userId', requireSignin, getActiveListBooks);

module.exports = router;
