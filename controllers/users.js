const User = require('../models/user');

const {
  ERROR_CODE,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR_CODE,
  USER_NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
} = require('../lib/errors');

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

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ Error: err.message });
    } else {
      res.status(DEFAULT_ERROR_CODE).send(err);
    }
  }
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
