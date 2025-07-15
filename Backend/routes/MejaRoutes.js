const express = require('express');
const router = express.Router();
const MejaController = require('../controllers/MejaController');

router.get('/', MejaController.getAllMeja);
router.put('/:id', MejaController.updateStatusMeja);

module.exports = router;
