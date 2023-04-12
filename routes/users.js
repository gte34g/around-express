const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  // getCurrentUser,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

router.get('/', auth, getUsers);
router.get(
  '/:_id',
  auth,
  celebrate({
    body: Joi.object({
      id: Joi.string().alphanum().required(),
    }),
  }),
  getUserById,
);
// router.get('/me', getCurrentUser);
router.patch('/me', auth, updateUser);
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
