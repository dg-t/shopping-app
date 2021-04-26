const Shirts = require('../models/shirtsModel');

exports.createShirts = async(req, res) => {
    console.log(req.body);
    try {
        const newShirt = await Shirts.create(req.body);

        res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                shirt: newShirt
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error
        });
    }
}