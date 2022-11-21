const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = require('../lib/config');

const User = require('../models/user');

const { processUserWithId } = require('../lib/helpers');
const {
  INVALID_DATA,
  DEFAULT_ERROR_CODE,
  USER_NOT_FOUND,
  DEFAULT_ERROR,
} = require('../lib/errors');

const ConflictError = ('../errors/ConflictError'); // 409
const NOT_FOUND_ERROR = ('../errors/NotFoutnd'); // 404
const Unauthorized = ('../errors/Unauthorized'); // 401
const Validation = ('../errors/Validation.js'); // 400

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.send(DEFAULT_ERROR_CODE).send(err);
  }
};

const getUserById = async (req, res) => {
  const { _id } = req.params;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ Error: USER_NOT_FOUND });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR).send({ Error: INVALID_DATA });
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
        next(new Validation(err.message));
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
        res.status(Validation).send({ Error: INVALID_DATA });
      } else if (err.name === 'ValidationError') {
        res.status(Validation).send({ Error: err.message });
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
        res.status(Validation).send({ Error: INVALID_DATA });
      } else if (err.name === 'ValidationError') {
        res.status(Validation).send({ Error: err.message });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    });
};

const getCurrentUser = (req, res, next) => {
  processUserWithId(req, res, User.findById(req.user._id), next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new Unauthorized('Incorrect email or password'));
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
