const Searches = require('../models/Searches');

exports.getSearch = async (req, res) => {
  try {
    const searches = await Searches.aggregate([
      {
        $group: {
          _id: '$query',
          count: { $sum: 1 },
          id: {
            $last: '$_id',
          },
          query: {
            $last: '$query',
          },
          user: {
            $last: '$user',
          },
          createdAt: {
            $last: '$createdAt',
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 20 },
    ]);

    return res.json(searches);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.addSearch = async (req, res) => {
  try {
    const { userId, query } = req.body;

    const newSearch = new Searches({
      query: query,
      user: userId && userId,
    });

    await newSearch.save();
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};
