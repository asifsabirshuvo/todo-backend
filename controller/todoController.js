const express = require("express");
const router = express.Router();
const rideService = require('./../service/rideService');

const { createRideValidator } = require('./../validators/createRideValidator');
const { findRideValidator } = require('./../validators/findRideValidator');
const { requestRideValidator } = require('./../validators/requestRideValidator');
const { endRideValidator } = require('./../validators/endRideValidator');

const { check, validationResult } = require("express-validator"); //to validate form
const { query, queryValidationResult } = require("express-validator"); //to validate form


router.get("/", async(req, res) => {

    const page = parseInt(req.query.page ? req.query.page : 1);
    const limit = parseInt(req.query.limit ? ((req.query.limit <= 10) ? req.query.limit : 10) : 10);

    const data = await rideService.findRides(reqFilters);
    return res.status(data.status).json({
        success: data.success,
        message: data.message
    });

}

});


router.post("/request-ride", requestRideValidator,
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            if (parseInt(req.body.seatQuantity) > 2) {
                return res.status(400).json({
                    success: false,
                    message: 'maximum 2 seats requests are allowed'
                });
            }
            const data = await rideService.requestRide(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });
        }
    }
);

router.post("/end-ride", endRideValidator,
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            const data = await rideService.endRide(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });
        }
    }
);

router.get("/ride-stats", async(req, res) => {
    const data = await rideService.rideStats();
    return res.status(data.status).json({
        success: data.success,
        message: data.message
    });

});
module.exports = router;