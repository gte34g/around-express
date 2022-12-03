const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFound');
const User = require('../models/user');

const processCardWithId = (req, res, action, next) =>
  action
    .orFail(() => {
      throw new NotFoundError('No card found with this Id');
    })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        next(new NotFoundError('No card found with this Id'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });

const processUserWithId = (id, res, next) =>
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('No user found with this Id');
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.message));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });

module.exports = { processCardWithId, processUserWithId };
