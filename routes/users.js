const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const validateURL = require('../lib/validator');

const auth = require('../middlewares/auth');
// const { validateUserId } = require('../middlewares/validation');

router.get('/', getUsers);
router.get(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().alphanum().length(24)
        .hex(),
    }),
  }),
  getUser,
);
router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),

  }),
}), updateUser);
router.patch(
  '/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar,
);

module.exports = router;
