/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;
// const { JWT_SECRET } = require('../lib/config');
const JWT_SECRET = 'secret-something';
const User = require('../models/user');

// const processUserWithId = require('../lib/helpers');

const Unauthorized = require('../errors/Unauthorized');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
// const NotFoundError = require('../errors/NotFound');
const {
  ERROR_CODE,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR_CODE,
  USER_NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  SUCCESS_OK,
} = require('../lib/errors');

// GET
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(SUCCESS_OK).send(users)) // 200
    .catch((err) => next(new DEFAULT_ERROR_CODE(err.message))); // 500
};

const getUserById = async (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ Error: USER_NOT_FOUND });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ Error: INVALID_DATA });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Email already exists');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true, new: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ Error: USER_NOT_FOUND });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ Error: INVALID_DATA });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ Error: err.message });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    });
};

const updateAvatar = (req, res) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { avatar: req.body.avatar },
    { runValidators: true, new: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ Error: USER_NOT_FOUND });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ Error: INVALID_DATA });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ Error: err.message });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      // eslint-disable-next-line no-shadow
      res.send({ data: user.toJSON(), token });
    })
    .catch((err) => {
      throw new Unauthorized(err.message);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
