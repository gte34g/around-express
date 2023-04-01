const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('You are not authorized'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET || 'default-secret');
  } catch (err) {
    return next(new Unauthorized('You are not authorized'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
