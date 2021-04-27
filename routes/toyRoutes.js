const express = require('express');
const toyController = require('../controllers/toyController');

const router = express.Router();

router.route('/').get().post(toyController.createToy);

module.exports = router;