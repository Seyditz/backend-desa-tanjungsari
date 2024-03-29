const express = require('express');
const router = express.Router();

const UmkmController = require('../controllers/UmkmController');
const authenticate = require('../middleware/authenticate');

router.get('/', UmkmController.getAll);
router.post('/get-by-id', UmkmController.getUmkmById);
router.post('/create', authenticate, UmkmController.createUmkm);
router.post('/delete', authenticate, UmkmController.deleteUmkm);
router.post('/update', authenticate, UmkmController.updateUmkm);
router.post('/search', UmkmController.searchUmkms);

module.exports = router;
