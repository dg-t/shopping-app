const Toy = require('../models/toyModel');


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

        // FILTERING
        const queryObj = {...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Toy.find(JSON.parse(queryStr));
        console.log(req.query)

        // SORTING
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // LIMIT FIELDS
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // PAGINATION
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numToys = await Toy.countDocuments();
            if (skip >= numToys) {
                throw new Error('Page not exist')
            }
        }

        // EXECUTE QUERY
        const toys = await query;

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