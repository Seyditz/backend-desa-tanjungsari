const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const authenticate = require('../middleware/authenticate');

router.get('/', PostController.getAll);
router.post('/create', PostController.createPost);
router.post('/delete', PostController.deletePost);
router.post('/update', PostController.updatePost);

module.exports = router;
