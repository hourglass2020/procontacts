const express = require("express");

const contactController = require("../controllers/contactController");
const {userAuthenticated} = require("../middlewares/userAuth");

const router = express.Router();

// @desc    get all contacts
// @route   GET /contacts
router.get("/", userAuthenticated, contactController.getContacts);

// @desc    add new contact
// @route   POST /contacts
router.post("/", userAuthenticated, contactController.addContact);

// @desc    add label for contact
// @route   POST /contacts/add-label
router.post("/add-label", userAuthenticated, contactController.addLabel);

// @desc    add label for contact
// @route   POST /contacts/add-label
router.put("/:contactId", userAuthenticated, contactController.updateContact);

// @desc    add label for contact
// @route   POST /contacts/add-label
router.delete("/:contactId", userAuthenticated, contactController.deleteContact);

module.exports = router;