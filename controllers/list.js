const List = require('../models/List');

exports.getList = async (req, res) => {
  try {
    const list = await List.find({ user: req.params.userId });
    if (list) {
      res.json(list);
    }
  } catch (error) {
    es.status(400).send('Error Loading list');
  }
};

exports.addList = async (req, res) => {
  try {
    const { name } = req.body;

    // validate fields
    if (!name) return res.status(400).send('Field cannot be empty');

    //check if list with same name exists
    let listExist = await List.findOne({
      name: name[0].toUpperCase() + name.substring(1),
      user: req.params.userId,
    }).exec();
    if (listExist) return res.status(400).send('List already exists');

    const newList = new List({
      name: name[0].toUpperCase() + name.substring(1),
      user: req.params.userId,
    });

    newList.save();

    return res.json(newList);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};
