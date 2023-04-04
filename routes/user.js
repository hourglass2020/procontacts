const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

// @desc    get all users
// @route   GET /user/all
router.get("/all", userController.getAllUsers)

// @desc    get all users
// @route   GET /user/all
router.get("/:userId", userController.getUser);

// @desc    create new user
// @route   POST /user/register
router.post("/register", userController.createUser);

// @desc    handle login
// @route   POST /user/login
router.post("/login", userController.handleLogin);

// @desc    handle login
// @route   PUT /user/update
router.put("/update/:userId", userController.updateUser);

module.exports = router;