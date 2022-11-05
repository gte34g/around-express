const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('You are not authorized'));
  }

  let payload;
  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, NODE_ENV, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('You are not authorized'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
