const express = require('express');
const PersonController = require('./personController');

const router = express.Router();
router.post('/persons', PersonController.create);
router.get('/persons/:id', PersonController.find);
module.exports = router;
