const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const auth = require('../middlewares/auth');
const validateUserId = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', validateUserId, getCurrentUser);
router.get('/:_id', getUserById);

router.patch('/me', updateUser);
router.patch(
  '/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateAvatar,
);

module.exports = router;
