const List = require('../models/List');
const Book = require('../models/Book');

exports.getList = async (req, res) => {
  try {
    const list = await List.find({ user: req.params.userId }).sort({
      createdAt: 'ascending',
    });
    if (list) {
      res.json(list);
    }
  } catch (error) {
    res.status(400).send('Error Loading list');
  }
};

exports.addList = async (req, res) => {
  try {
    const { name } = req.body;

    // validate fields
    if (!name) return res.status(400).send('Field cannot be empty');

    //check if list with same name exists
    let listExist = await List.findOne({
      name: name[0].toLowerCase() + name.substring(1),
      user: req.params.userId,
    }).exec();
    if (listExist) return res.status(400).send('List already exists');

    const newList = new List({
      name: name[0].toLowerCase() + name.substring(1),
      user: req.params.userId,
    });

    await newList.save();

    const list = await List.find({ user: req.params.userId });
    if (list) {
      res.json(list);
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.editList = async (req, res) => {
  try {
    const { listId, name } = req.body;

    let editList = await List.findOne({
      _id: listId,
      user: req.params.userId,
    }).exec();

    editList.name = name[0].toLowerCase() + name.substring(1);
    await editList.save();

    const list = await List.find({ user: req.params.userId });
    if (list) {
      res.json(list);
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.deleteList = async (req, res) => {
  try {
    const { listId } = req.body;

    await List.deleteOne({ user: req.params.userId, _id: listId }).exec();
    await Book.deleteMany({ user: req.params.userId, list: listId }).exec();

    const list = await List.find({ user: req.params.userId });
    if (list) {
      res.json(list);
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};
