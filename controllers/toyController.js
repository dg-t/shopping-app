const Toy = require('../models/toyModel');
const APIFeatures = require('../utils/APIFeatures');


// CREATE TOY
exports.createToy = async(req, res) => {
    console.log(req.body);
    try {
        const newToy = await Toy.create(req.body);

        res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                toy: newToy
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        });
    }
}

// GET ALL TOYS
exports.getAllToys = async(req, res) => {

    try {

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
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}

// GET TOY
exports.getToy = async(req, res) => {
    try {
        const toy = await Toy.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                toy
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            message: error
        })
    }
}

// UPDATE TOY
exports.updateToy = async(req, res) => {
    try {
        const toy = await Toy.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                toy
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// DELETE TOY
exports.deleteToy = async(req, res) => {
    try {
        await Toy.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};