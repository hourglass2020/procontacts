const express = require("express");
const bcrypt = require("bcryptjs");

const userController = require("../controllers/userController");
const User = require("../models/user");

const {createError} = require("../utils/errorParser");

const router = express.Router();


// @desc    get all users
// @route   GET /user/all
router.get("/all", userController.getAllUsers)

// @desc    create new user
// @route   POST /user/register
router.post("/register", userController.createUser);

// @desc    login handle
// @route   POST /user/login
router.post("/login", async (req, res, next) => {
    const {password, email} = req.body;

    try {
        const user = await User.findOne({where: {email}});

        if (user === null) {
            throw createError("there is not such a user.", 404);
        }

        let isEqual = await bcrypt.compare(password, user.password);

        if (isEqual) {
            return res.status(200).json({message: "Successfully logged in."});
        }

        throw createError("Password is not correct!", 422);

    } catch (err) {
        next(err);
    }
})

module.exports = router;