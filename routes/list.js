const express = require('express');

const router = express.Router();

//controllers
const { getList, addList } = require('../controllers/list');
const { requireSignin } = require('../controllers/auth');

//routes
router.get('/list/:userId', requireSignin, getList);
router.post('/add-list/:userId', requireSignin, addList);

module.exports = router;
