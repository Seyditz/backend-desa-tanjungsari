const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, UserController.getAll);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/delete', UserController.deleteUser);
router.post('/update', UserController.updateUser);

module.exports = router;
