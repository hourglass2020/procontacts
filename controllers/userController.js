const {createError} = require("../utils/errorParser");
const User = require("../models/user");

exports.createUser = async (req, res, next) => {
    try {
        if (!req.body.user) {
            throw createError("There is no user's data", 401);
        }

        let tempUser = req.body.user;

        const [user, created] = await User.findOrCreate({
            where: {
                email: tempUser.email
            },
            defaults: {
                fullName: tempUser.fullName,
                password: tempUser.password
            }
        });

        if (created) {
            return res.status(201).json({message: "Successfully created!"});
        }

        // return res.status(422).json({message: "This email is already used."});
        throw createError("This email is already used.", 422);
    } catch (err) {
        next(err);
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({users})
    } catch (err) {
        throw err;
    }
}