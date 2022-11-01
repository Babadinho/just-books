const express = require('express');

const router = express.Router();

//controllers
const { editUser } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

//routes
router.post('/edit-user/:userId', requireSignin, editUser);

module.exports = router;
