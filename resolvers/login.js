import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const Signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    // if the user does not exist:
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }
    // see if there is a match between mongoose encrypted password and user supplied password:
    const match = await bcrypt.compare(password, user.password);

    // if the password's don't match, then send a 400 response to the client
    if (!match) {
      return res.status(400).json({
        message: 'Incorrect password!',
      });
    }
    // if there is a match, then proceed:
    // what to send back to the client encrypted in the JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // create a new token for the client:
    const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: 60 * 60, // set to expire in 1 hour
    });
    // send the token back to the client
    res.status(200).send({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).send('Error in saving');
  }
};

export default Signup;
