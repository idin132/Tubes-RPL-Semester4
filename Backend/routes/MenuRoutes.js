const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/MenuController');

router.get('/', MenuController.getAllMenu);
router.post('/', MenuController.createMenu);
router.put('/:id', MenuController.updateMenu);
router.delete('/:id', MenuController.deleteMenu);

module.exports = router;
