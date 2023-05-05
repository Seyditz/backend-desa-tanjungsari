const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const authenticate = require('../middleware/authenticate');

router.get('/', PostController.getAll);
router.post('/get-by-id', PostController.getPostById);
router.post('/create', authenticate, PostController.createPost);
router.post('/delete', authenticate, PostController.deletePost);
router.post('/update', authenticate, PostController.updatePost);
router.post('/search', PostController.searchPosts);

module.exports = router;
