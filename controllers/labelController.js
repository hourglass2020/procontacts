const Label = require("../models/label");
const {createError} = require("../utils/errorParser");

exports.addLabel = async (req, res, next) => {
    try {
        const tempLabel = req.body.label;
        const userId = req.userId;

        const [label, created] = await Label.findOrCreate({
            where: {
                name: tempLabel.name
            },
            defaults:{
                UserId: userId
            }
        } );

        if(created){
            return res.status(201).json({message: "Successfully created!", label});
        }

        throw createError("You have such a label", 422)
    } catch (err) {
        next(err);
    }
}