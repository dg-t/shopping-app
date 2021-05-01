const express = require('express');
const toyController = require('../controllers/toyController');

const router = express.Router();

// Global routes
router.route('/').get(toyController.getAllToys).post(toyController.createToy);

// Routes for specific toy
router.route('/:id').get(toyController.getToy).patch(toyController.updateToy).delete(toyController.deleteToy)

module.exports = router;