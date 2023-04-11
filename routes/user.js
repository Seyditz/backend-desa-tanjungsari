const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, UserController.getAll);
router.post('/get-by-id', authenticate,UserController.getUserById);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/delete', authenticate, UserController.deleteUser);
router.post('/update', authenticate, UserController.updateUser);

module.exports = router;
