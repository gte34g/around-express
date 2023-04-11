const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  authValidation,
  validateUserId,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/', authValidation, getUsers);
router.get('/:_id', validateUserId, getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', updateUser);
router.patch(
  '/me/avatar',
  updateAvatarValidation,
  updateUserValidation,
  updateAvatar,
);

module.exports = router;
