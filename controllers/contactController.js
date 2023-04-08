const Contact = require("../models/contact");
const Label = require("../models/label");
const {createError} = require("../utils/errorParser");

// * Checked!
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

// * Checked!
exports.updateContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByPk(req.params.contactId);
        const tempContact = req.body.contact;

        if (contact === null) {
            throw createError("There is not any contact with this id", 404);
        }

        contact.firstName = tempContact.firstName ?? contact.firstName;
        contact.lastName = tempContact.lastName ?? contact.lastName;
        contact.company = tempContact.company ?? contact.company;
        contact.phone = tempContact.phone ?? contact.phone;
        contact.phoneLabel = tempContact.phoneLabel ?? contact.phoneLabel;
        contact.email = tempContact.email ?? contact.email;
        contact.emailLabel = tempContact.emailLabel ?? contact.emailLabel;
        contact.website = tempContact.website ?? contact.website;

        await contact.save();
        res.status(200).json({message: "Contact is updated successfully!", contact})
    } catch (err) {
        next(err);
    }
}

// * Checked!
exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByPk(Number(req.params.contactId));
        if (contact === null) {
            throw createError("There is not any contact with this id", 404);
        }

        await contact.destroy();
        res.status(200).json({message: "Contact is deleted successfully!"});
    } catch (err) {
        next(err);
    }
}

// * Checked!
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

// * Checked!
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.findAll({
            where: {
                UserId: req.userId
            },
            include: {
                model: Label,
                attributes: ["id", "name"]
            }
        });

        res.status(200).json({contacts});
    } catch (err) {
        next(err)
    }
}