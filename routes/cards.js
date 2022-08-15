const router = require('express').Router();
const { getCards, getCardById } = require('../controllers/cards');

router.get('/', getCards);
router.get('/:_id', getCardById);

module.exports = router;
