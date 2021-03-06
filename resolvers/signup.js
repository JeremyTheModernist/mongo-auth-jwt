import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        msg: 'User already exists',
      });
    }
    // if the user doesn't exist, create a new one:
    user = new User({
      username,
      email,
      password,
    });
    // create a hashed password using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // store that password in your MongoDB database
    await user.save();

    // what to send back to the client encrypted in the JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: 60 * 60, // set to expire in 1 hour
    });
    // send the client a JWT
    res.status(200).send({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).send('Error in saving');
  }
};

export default Signup;
