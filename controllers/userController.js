const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {createError} = require("../utils/errorParser");
const User = require("../models/user");

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(Number(userId));

        if (user === null) {
            throw createError("there is not such a user.", 404);
        }

        res.status(200).json({user});
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(Number(userId));

        if (user === null) {
            throw createError("there is not such a user.", 404);
        }

        const tempUser = req.body.user;
        user.fullName = tempUser.fullName;

        await user.save();
        res.status(200).json({message: "User is updated."});
    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findByPk(Number(userId));

        if (user === null) {
            throw createError("there is not such a user.", 404);
        }

        await user.destroy();
        res.status(200).json({message: "User is deleted."});
    } catch (err) {
        next(err);
    }
}

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

        throw createError("This email is already used.", 422);
    } catch (err) {
        next(err);
    }
}

exports.handleLogin = async (req, res, next) => {
    const {password, email} = req.body;

    try {
        const user = await User.findOne({where: {email}});

        if (user === null) {
            throw createError("there is not such a user.", 404);
        }

        let isEqual = await bcrypt.compare(password, user.password);

        if (isEqual) {
            const token = jwt.sign({
                user: {
                    userId: user.id,
                    fullName: user.fullName,
                    email: user.email
                }
            }, process.env.JWT_SECRET);

            return res.status(200).json({token, userId: user.id});
        }

        throw createError("Password is not correct!", 422);

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