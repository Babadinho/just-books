const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.editUser = async (req, res) => {
  try {
    const { details } = req.body;

    let user = await User.findById(req.params.userId)
      .select('+password')
      .exec();

    if (!details.new_password) {
      if (!details.username && !details.password)
        return res.status(400).send('Fields marked * are required');

      if (!details.password)
        return res.status(400).send('Password field is required');

      if (user.username === details.username) {
        return res
          .status(400)
          .send('New username is required to effect changes');
      }
      //match password
      bcrypt.compare(details.password, user.password, function (err, match) {
        if (!match || err) {
          return res.status(400).send('Password is incorrect');
        }
        user.username = details.username;
        user.save();

        //Generate jwt signed token and send as reponse to client
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        return res.json({
          token,
          user: {
            _id: user._id,
            username: user.username,
          },
        });
      });
    }

    if (details.new_password) {
      if (!details.password)
        return res.status(400).send('Password field is required');

      bcrypt.compare(details.password, user.password, function (err, match) {
        if (!match || err) {
          return res.status(400).send('Password is incorrect');
        }
      });
      // hash password and save user
      bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(details.new_password, salt, (err, hash) => {
          user.password = hash;
          details.username &&
            details.username !== user.username &&
            (user.username = details.username);
          user.save();

          //Generate jwt signed token
          let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
          });

          // send response to client
          return res.json({
            token,
            user: {
              _id: user._id,
              username: user.username,
            },
          });
        });
      });
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};
