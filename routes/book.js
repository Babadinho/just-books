const express = require('express');

const router = express.Router();

//controllers
const { addBook } = require('../controllers/book');
const { requireSignin } = require('../controllers/auth');

//routes
router.post('/book/add', requireSignin, addBook);

module.exports = router;
