const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;
// const JWT_SECRET = 'secret-something';
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // eslint-disable-next-line no-console
  console.log('Authorization header:', authorization);
  console.log('req.headers:', req.headers);
  console.log(typeof authorization);
  console.log('This is the auth.js', authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('You are not authorized'));
  }
  // eslint-disable-next-line no-console
  console.log('This is the JWT', JWT_SECRET);
  let payload;
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-something');
  } catch (err) {
    return next(new Unauthorized('You are not authorized'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
