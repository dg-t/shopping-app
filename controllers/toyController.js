const Toy = require('../models/toyModel');

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
            status: "Failed",
            message: error
        });
    }
}