const express = require('express');
const router = express.Router();

const HomeCarouselController = require('../controllers/HomeCarouselController');
const authenticate = require('../middleware/authenticate');

router.get('/', HomeCarouselController.getAll);
// router.post('/get-by-id', HomeCarouselController.getPostById);
router.post('/create', HomeCarouselController.createHomeCarousel);
// router.post('/delete', authenticate, HomeCarouselController.deletePost);
// router.post('/update', authenticate, HomeCarouselController.updatePost);
// router.post('/search', HomeCarouselController.searchPosts);

module.exports = router;
