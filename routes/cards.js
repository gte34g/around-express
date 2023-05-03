const router = require('express').Router();
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

router.get('/', getCards);
router.post('/', newCardValidation, createCard);
router.put('/cardId/likes', cardValidationId, likeCard);
router.delete('/cardId', cardValidationId, deleteCardById);
router.delete('/cardId/likes', cardValidationId, disLikeCard);

module.exports = router;
