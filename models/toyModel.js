const mongoose = require('mongoose');

// TOYS SCHEMA
const toySchema = new mongoose.Schema({
    toyName: {
        type: String,
        required: [true, 'A toy must have a name.'],
        unique: true
    },
    toyDescription: {
        type: String,
        required: [true, 'A toy must have a description']
    },
    toyImageCover: {
        type: String,
        // required: [true, 'A toy must have a cover image']
    },
    toyImages: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    toyPrice: {
        type: Number,
        required: [true, 'A toy must have a price.']
    },
    toyRating: {
        type: Number,
        default: 4.5
    }
});

// Create a Toys model
const Toys = mongoose.model('Toys', toySchema);

module.exports = Toys;