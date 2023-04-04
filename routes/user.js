const express = require("express");

const User = require("../models/user");
const {createError} = require("../utils/errorParser");

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({users})

    } catch (err) {
        throw err;
    }
})

router.post("/register", async (req, res) => {

    if (!req.body.user) {
        const error = createError("There is no user's data", 401);
        throw error;
    }

    let tempUser = req.body.user;

    try {
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

        return res.status(422).json({message: "This email is already used."});

    } catch (err) {
        throw err;
    }

})


module.exports = router;