const { nextTick } = require('@vue/runtime-core');
const Toy = require('../models/toyModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE TOY
exports.createToy = catchAsync(async(req, res, next) => {
    console.log(req.body);
    const newToy = await Toy.create(req.body);

    res.status(201).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            toy: newToy
        }
    });
});

// GET ALL TOYS
exports.getAllToys = catchAsync(async(req, res, next) => {

    // SET API FEATURES
    const features = new APIFeatures(Toy.find(), req.query).filter().sort().limitFields().paginate();
    // EXECUTE QUERY
    const toys = await features.query;

    res.status(200).json({
        status: 'success',
        results: toys.length,
        data: {
            toys
        }
    });
});

// GET TOY
exports.getToy = catchAsync(async(req, res, next) => {
    const toy = await Toy.findById(req.params.id);

    if (!toy) {
        return next(new AppError('Toy not found with the provided ID.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            toy
        }
    })
});

// UPDATE TOY
exports.updateToy = catchAsync(async(req, res, next) => {
    const toy = await Toy.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!toy) {
        return next(new AppError('Toy not found with the provided ID.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            toy
        }
    });
});

// DELETE TOY
exports.deleteToy = catchAsync(async(req, res, next) => {

    const toy = await Toy.findByIdAndDelete(req.params.id);

    if (!toy) {
        return next(new AppError('Toy not found with the provided ID.', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});