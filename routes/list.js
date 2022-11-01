const express = require('express');

const router = express.Router();

//controllers
const {
  getList,
  addList,
  editList,
  deleteList,
} = require('../controllers/list');
const { requireSignin } = require('../controllers/auth');

//routes
router.get('/list/:userId', requireSignin, getList);
router.post('/add-list/:userId', requireSignin, addList);
router.post('/edit-list/:userId', requireSignin, editList);
router.post('/delete-list/:userId', requireSignin, deleteList);

module.exports = router;
