const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const {
  cardValidationId,
  newCardValidation,
} = require('../middlewares/validation');

router.get('/', auth, getCards);
router.post('/', auth, newCardValidation, createCard);
router.put('/:_id/likes', auth, cardValidationId, likeCard);
router.delete('/:_id', auth, cardValidationId, deleteCardById);
router.delete('/:_id/likes', auth, cardValidationId, disLikeCard);

module.exports = router;
