const express = require("express");

const User = require("../models/user");
const Label = require("../models/label");
const Contact = require("../models/contact");
const {createError} = require("../utils/errorParser");

const contactController = require("../controllers/contactController");
const {userAuthenticated} = require("../middlewares/userAuth");

const router = express.Router();

// @desc    add new contact
// @route   POST /contacts
router.post("/", userAuthenticated, contactController.addContact);

// @desc    add label for contact
// @route   POST /contacts/add-label
router.post("/add-label", userAuthenticated, contactController.addLabel);

// @desc    add label for contact
// @route   POST /contacts/add-label
// router.put("/:contactId", userAuthenticated, contactController.updateContact);

// @desc    add label for contact
// @route   POST /contacts/add-label
// router.delete("/:contactId", userAuthenticated, contactController.deleteContact);

module.exports = router;