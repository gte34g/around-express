const path = require('path');
const getJsonFromFile = require('../helper/files');

const userFilePath = path.join(__dirname, '..', 'data', 'users.json');
const getUsers = (req, res) => {
  getJsonFromFile(userFilePath)
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(err));
};

const getUserById = (req, res) => {
  getJsonFromFile(userFilePath)
    .then((users) => users.find((user) => user._id === req.params._id))
    .then((user) => {
      if (user) {
        res.send(user);
        return;
      }
      res.status(404).send({ message: 'User ID not found' });
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getUsers,
  getUserById,
};
