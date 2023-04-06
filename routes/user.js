const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

// @desc    get all users
// @route   GET /user/all
router.get("/", userController.getAllUsers)

// @desc    get all users
// @route   GET /user/all
router.get("/:userId", userController.getUser);

// @desc    create new user
// @route   POST /user/register
router.post("/", userController.createUser);

// @desc    handle login
// @route   POST /user/login
router.post("/login", userController.handleLogin);

// @desc    handle login
// @route   PUT /user/update
router.put("/:userId", userController.updateUser);

module.exports = router;