const express = require("express");

const User = require("../models/user");
const Contact = require("../models/contact");

const router = express.Router();

router.post("/add", async (req, res, next) => {
    try {
        const userId = Number(req.body.userId);
        const tempContact = req.body.contact;

        const contact = await Contact.create({
            UserId:userId,
            firstName: tempContact.firstName
        });

        res.status(200).json({message: "Successfully added!"});

    } catch (err) {
        next(err);
    }
})

module.exports = router;