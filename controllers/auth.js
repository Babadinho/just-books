const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    //validate fields
    if (!username || !password)
      return res.status(400).send('All fields are required');

    //validate password
    if (password.length < 6)
      return res
        .status(400)
        .send('Pasword too short, must be 6 characters and above');

    //check if user user already exists
    let userExist = await User.findOne({ username: username }).exec();
    if (userExist) return res.status(400).send('Username already exists');

    //register user
    const user = new User(req.body);

    // hash password and save user
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        user.save();

        //Generate jwt signed token
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        res.json({
          token,
          user: {
            _id: user._id,
            username: user.username,
          },
        });
      });
    });
  } catch (err) {
    console.log('User registration failed', err);
    return res.status(400).send('Error. Try again');
  }
};

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   //validation
//   if (!username || !password)
//     return res.status(400).send('All fields are required');

//   try {
//     let user = await User.findOne({ username }).exec();
//     if (!user)
//       return res.status(400).send('User with that username does not exist');

//     //match password
//     bcrypt.compare(password, user.password, function (err, match) {
//       if (!match || err) {
//         return res.status(400).send('Password is incorrect');
//       }
//       console.log('password match', match);
//       //Generate jwt signed token and send as reponse to client
//       let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//       });

//       return res.json({
//         token,
//         user: {
//           _id: user._id,
//           username: user.username,
//         },
//       });
//     });
//   } catch (err) {
//     console.log('Login Error', err);
//     res.status(400).send('Login failed. try again');
//   }
// };
