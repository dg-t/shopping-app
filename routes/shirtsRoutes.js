const express = require('express');
const shirtsController = require('../controllers/shirtsController');

const router = express.Router();

router.route('/').get().post(shirtsController.createShirts);

module.exports = router;