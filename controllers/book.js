const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
      user: req.params.userId,
    });
    await book.save();

    const books = await Book.find({ user: req.params.userId }).exec();
    return res.json(books);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.removeBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    await Book.deleteOne({ user: req.params.userId, id: bookId }).exec();
    const books = await Book.find({ user: req.params.userId }).exec();
    return res.json(books);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $group: {
          _id: '$id',
          id: {
            $last: '$id',
          },
          user: {
            $last: '$user',
          },
          list: {
            $last: '$list',
          },
          volumeInfo: {
            $last: '$volumeInfo',
          },
          createdAt: {
            $last: '$createdAt',
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 21 },
    ]);

    return res.json(books);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const book = await Book.find({ user: req.params.userId })
      .populate('user')
      .sort({ createdAt: 'descending' })
      .exec();
    return res.json(book);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.getActiveListBooks = async (req, res) => {
  const { listId } = req.body;

  try {
    const books = await Book.find({
      user: req.params.userId,
      list: listId,
    }).sort({ createdAt: 'descending' });
    if (books) {
      res.json(books);
    }
  } catch (error) {
    res.status(400).send('Error Loading list');
  }
};
