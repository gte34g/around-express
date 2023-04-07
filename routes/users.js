const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateObjId,
  validateAvatar,
  validateProfile,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:_id', validateObjId, getUserById);
router.get('/me', validateProfile, getCurrentUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', validateAvatar, validateProfile, updateAvatar);

// eslint-disable-next-line no-console
console.log('User router initialized');

module.exports = router;
