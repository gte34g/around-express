const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateUserdId,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/', auth, getUsers);
router.get('/:_id', auth, validateUserdId, getUserById);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatarValidation, updateUserValidation, updateAvatar);

module.exports = router;
