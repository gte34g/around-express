const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateAuthentication,
  validateObjId,
  validateAvatar,
  validateProfile,
} = require('../middlewares/validation');

router.get('/', validateAuthentication, getUsers);
router.get('/:_id', validateAuthentication, validateObjId, getUserById);
router.get('/me', validateAuthentication, getCurrentUser);

router.patch('/me', validateAuthentication, validateProfile, updateUser);
router.patch('/me/avatar', validateAuthentication, validateAvatar, updateAvatar);

module.exports = router;
