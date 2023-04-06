const express = require("express");

const User = require("../models/user");
const Label = require("../models/label");
const Contact = require("../models/contact");
const {createError} = require("../utils/errorParser");

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

router.post("/add-label", async (req, res, next) => {
    try {
        const contact = await Contact.findByPk(Number(req.body.contactId));
        if(contact === null){
            throw createError("There is not any contact with this id", 404);
        }

        const label = await Label.findByPk(Number(req.body.labelId));
        if(label === null){
            throw createError("There is not any label with this id", 404);
        }

        await contact.addLabel(label);

        res.status(200).json({message: "Successful!"});
    }catch (err) {
        next(err)
    }
})


module.exports = router;