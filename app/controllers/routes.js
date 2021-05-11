const express = require('express');
const PersonController = require('./personController');
const SecurityController = require('./securityController');

const router = express.Router();
router.post('/persons', PersonController.create);
router.get('/persons/:id', PersonController.find);

router.post('/security/login', SecurityController.login);
router.post('/security/validate-token', SecurityController.validateToken);

module.exports = router;
