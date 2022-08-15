const router = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUserById);

module.exports = router;
