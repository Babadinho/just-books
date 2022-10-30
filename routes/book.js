const express = require('express');

const router = express.Router();

//controllers
const { addBook, removeBook, getMyBooks } = require('../controllers/book');
const { requireSignin } = require('../controllers/auth');

//routes
router.post('/add-book/:userId', requireSignin, addBook);
router.post('/remove-book/:userId', requireSignin, removeBook);
router.get('/books/:userId', requireSignin, getMyBooks);

module.exports = router;
