const express = require('express');
const router = express.Router();
const endpointController = require('../controllers/EndpointController');
const { requireJwtAuth } = require('../middleware');

router.get('/', requireJwtAuth, endpointController);

module.exports = router;
