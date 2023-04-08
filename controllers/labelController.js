const Label = require("../models/label");
const {createError} = require("../utils/errorParser");

// * Checked!
exports.addLabel = async (req, res, next) => {
    try {
        const tempLabel = req.body.label;
        const userId = req.userId;

        const [label, created] = await Label.findOrCreate({
            where: {
                name: tempLabel.name
            },
            defaults: {
                UserId: userId
            }
        });

        if (created) {
            return res.status(201).json({message: "Successfully created!", label});
        }

        throw createError("You have such a label", 422)
    } catch (err) {
        next(err);
    }
}

// * Checked!
exports.updateLabel = async (req, res, next) => {
    try {
        const label = await Label.findByPk(req.params.labelId);
        if (label === null) {
            throw createError("There is no label with this id.", 404);
        }

        const tempLabel = req.body.label;
        label.name = tempLabel.name;
        await label.save();

        res.status(200).json({message: "Label is successfully updated!"});
    } catch (err) {
        next(err);
    }
}

exports.deleteLabel = async (req, res, next) => {
    try {
        const label = await Label.findByPk(req.params.labelId);
        if (label === null) {
            throw createError("There is no label with this id.", 404);
        }

        await label.destroy();
        res.status(200).json({message:"Label is deleted."});
    } catch (err) {
        next(err);
    }
}