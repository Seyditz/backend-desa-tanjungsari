const express = require('express');
const router = express.Router();

const UmkmController = require('../controllers/UmkmController');
const authenticate = require('../middleware/authenticate');

router.get('/', UmkmController.getAll);
router.post('/create', UmkmController.createUmkm);
router.post('/delete', UmkmController.deleteUmkm);
router.post('/update', UmkmController.updateUmkm);

module.exports = router;
