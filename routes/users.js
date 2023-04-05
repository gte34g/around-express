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
  validateUserdId,
  validateAvatar,
  validateProfile,
} = require('../middlewares/validation');

router.get('/', authValidation, getUsers);
router.get('/:_id', authValidation, validateUserdId, getUserById);
router.get('/me', authValidation, getCurrentUser);

router.patch('/me', authValidation, validateProfile, updateUser);
router.patch('/me/avatar', authValidation, validateAvatar, updateAvatar);

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

module.exports = router;
