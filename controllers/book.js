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

  console.log(bookId);

  try {
    await Book.deleteOne({ user: req.params.userId, id: bookId }).exec();
    const books = await Book.find({ user: req.params.userId }).exec();
    return res.json(books);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.getMyBooks = async (req, res) => {
  try {
    const book = await Book.find({ user: req.params.userId }).exec();
    return res.json(book);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};
