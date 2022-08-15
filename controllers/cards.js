const path = require('path');
const getJsonFromFile = require('../helper/files');

const cardFilePath = path.join(__dirname, '..', 'data', 'cards.json');
const getCards = (req, res) => {
  getJsonFromFile(cardFilePath)
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send(err));
};

const getCardById = (req, res) => {
  getJsonFromFile(cardFilePath)
    .then((cards) => cards.find((card) => card._id === req.params._id))
    .then((card) => {
      if (card) {
        res.send(card);
        return;
      }
      res.status(404).send({ message: 'Card ID not found' });
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getCards,
  getCardById,
};
