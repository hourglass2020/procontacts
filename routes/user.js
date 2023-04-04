const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

// @desc    get all users
// @route   GET /user/all
router.get("/all", userController.getAllUsers)

// @desc    create new user
// @route   POST /user/register
router.post("/register", userController.createUser);

// @desc    login handle
// @route   POST /user/login
router.post("/login", userController.handleLogin);

module.exports = router;