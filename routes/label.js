const express = require("express");

const Label = require("../models/label");
const {createError} = require("../utils/errorParser");
const {userAuthenticated} = require("../middlewares/userAuth");

const labelController = require("../controllers/labelController");

const router = express.Router();

// @desc    add new label
// @route   POST /labels/
router.post("/", userAuthenticated, labelController.addLabel)

// @desc    update the label
// @route   PUt /labels/:labelId
// router.put("/:labelId", userAuthenticated, labelController.updateLabel)

// @desc    delete the label
// @route   DELETE /labels/:labelId
// router.post("/:labelId", userAuthenticated, labelController.deleteLabel)

module.exports = router;
