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
    const books = await Book.find()
      .limit(21)
      .sort({ createdAt: 'descending' })
      .exec();
    return res.json(books);

    // Book.aggregate([
    //   {
    //     $sort: {
    //       id: 1,
    //       createdAt: 1,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$id',
    //       createdAt: {
    //         $last: '$createdAt',
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       id: '$_id',
    //       createdAt: '$createdAt',
    //     },
    //   },
    // ]).exec((books) => {
    //   res.json(books);
    // });
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const book = await Book.find({ user: req.params.userId })
      .populate('user')
      .exec();
    return res.json(book);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.getActiveListBooks = async (req, res) => {
  const { listId } = req.body;

  try {
    const books = await Book.find({ user: req.params.userId, list: listId });
    if (books) {
      res.json(books);
    }
  } catch (error) {
    res.status(400).send('Error Loading list');
  }
};
