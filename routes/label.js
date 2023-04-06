const express = require("express");

const Label = require("../models/label");
const {createError} = require("../utils/errorParser");

const router = express.Router();

router.post("/add", async (req, res, next) => {
    try {
        const tempLabel = req.body.label;
        const userId = req.body.userId;

        const [label, created] = await Label.findOrCreate({
            where: {
                name: tempLabel.name
            },
            defaults:{
                UserId: userId
            }
        } );

        if(created){
            return res.status(201).json({message: "Successfully created!"});
        }

        throw createError("You have such a label", 422)
    } catch (err) {
        next(err);
    }
})

module.exports = router;
