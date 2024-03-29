const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, UserController.getAll);
router.post('/get-by-id',UserController.getUserById);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/delete', authenticate, UserController.deleteUser);
router.post('/update', authenticate, UserController.updateUser);
router.post('/search', UserController.searchUsers);

module.exports = router;
