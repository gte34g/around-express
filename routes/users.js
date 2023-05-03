const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const { validateUserId } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', validateUserId, getUserInfo);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
