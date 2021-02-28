import jwt from 'jsonwebtoken';

// need to pass the results on to the the route this middleware is used in:
const isAuthorized = (req, res, next) => {
  // check to see if a JWT token was sent along with the client request.
  // here, we are checking the 'token' header sent from the client
  // this can be set in the client headers via fetch, axios, etc.
  const token = req.header('token');
  if (!token) return res.status(401).json({ message: 'Auth Error' });
  try {
    // decode the token and retrieve the value
    // this value will be what you stored in the JWT payload when it was signed
    // which is the User ID
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    // set the request user = to the decoded user id;
    req.user = decoded.user;
    // pass this along to the next route
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Invalid token' });
  }
};

export default isAuthorized;
