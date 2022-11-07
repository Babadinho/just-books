const express = require('express');

const router = express.Router();

//controllers
const { getSearch, addSearch } = require('../controllers/searches');
const { requireSignin } = require('../controllers/auth');

//routes
router.get('/searches', getSearch);
router.post('/add-search', addSearch);

module.exports = router;
