const mongoose = require('mongoose');

// TOYS SCHEMA
const toySchema = new mongoose.Schema({
    toyName: {
        type: String,
        required: [true, 'A toy must have a name.'],
        unique: true,
        trim: true,
        maxLength: [40, 'Toys name cannot have more then 40 characters'],
        minLength: [3, 'Toys name cannot have less then 10 characters']
    },
    toyDescription: {
        type: String,
        required: [true, 'A toy must have a description'],
        trim: true
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
    toyPriceDiscount: {
        type: Number,
        validate: {
            validator: function(val) {
                // this only points to current doc on NEW document creation
                return val < this.toyPrice;
            },
            message: 'Discount price ({VALUE}) should be below regular price'
        }
    },
    toyRatingAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    toyRatingQuantity: {
        type: Number,
        default: 0
    }
});

// Create a Toys model
const Toys = mongoose.model('Toys', toySchema);

module.exports = Toys;