const mongoose = require('mongoose');

// SHIRTS SCHEMA
const shirtsSchema = new mongoose.Schema({
    shirtBrand: {
        type: String,
        required: [true, 'The shirt brand must be specified.']
    },
    shirtType: {
        type: String,
        required: [true, 'The shirt type must be specified.']
    },
    shirtModel: {
        type: String,
        required: [true, 'The shirt model must be specified.'],
        unique: true
    },
    shirtPrice: {
        type: Number,
        required: [true, 'The shirt price must be specified.']
    },
    shirtRating: {
        type: Number,
        default: 4.5
    }
});

// Create a Shirts model
const Shirts = mongoose.model('Shirts', shirtsSchema);

module.exports = Shirts;