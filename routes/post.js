const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const authenticate = require('../middleware/authenticate');

router.get('/', PostController.getAll);
router.post('/create', authenticate, PostController.createPost);
router.post('/delete', authenticate, PostController.deletePost);
router.post('/update', authenticate, PostController.updatePost);

module.exports = router;
