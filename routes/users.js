const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

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
