const Contact = require("../models/contact");
const {createError} = require("../utils/errorParser");
const Label = require("../models/label");

exports.addContact = async (req, res, next) => {
    try {
        const userId = Number(req.userId);
        const tempContact = req.body.contact;

        const contact = await Contact.create({
            UserId: userId,
            firstName: tempContact.firstName,
            lastName: tempContact.lastName,
            company: tempContact.company,
            phone: tempContact.phone,
            phoneLabel: tempContact.phoneLabel,
            email: tempContact.email,
            emailLabel: tempContact.emailLabel,
            website: tempContact.website
        });

        res.status(200).json({message: "Successfully added!", contact});
    } catch (err) {
        next(err);
    }
}

exports.addLabel = async (req, res, next) => {
    try {
        const contact = await Contact.findByPk(Number(req.body.contactId));
        if (contact === null) {
            throw createError("There is not any contact with this id", 404);
        }

        const label = await Label.findByPk(Number(req.body.labelId));
        if (label === null) {
            throw createError("There is not any label with this id", 404);
        }

        await contact.addLabel(label);
        res.status(201).json({message: "Successful!"});
    } catch (err) {
        next(err)
    }
}