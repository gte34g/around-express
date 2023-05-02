const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const { validateUserId } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', validateUserId, getUserById);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
