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
  // validateUserdId,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/', authValidation, getUsers);
router.get('/:id', getUserById);
router.get('/users/me', authValidation, getCurrentUser);
router.patch('/users/me', authValidation, updateUser);
router.patch('/users/me/avatar', authValidation, updateAvatarValidation, updateUserValidation, updateAvatar);

module.exports = router;
