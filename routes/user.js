const express = require("express");

const userController = require("../controllers/userController");
const {userAuthenticated} = require("../middlewares/userAuth");

const router = express.Router();

// @desc    get all users
// @route   GET /user/all
// router.get("/", userController.getAllUsers)

// @desc    create new user
// @route   POST /users/register
router.post("/", userController.createUser);

// @desc    handle login
// @route   POST /users/login
router.post("/login", userController.handleLogin);

// @desc    get user's info
// @route   GET /users/all
router.get("/:userId", userAuthenticated, userController.getUser);

// @desc    handle update user
// @route   PUT /users/update
router.put("/:userId", userAuthenticated, userController.updateUser);

// @desc    handle login
// @route   DELETE /users/update
router.delete("/:userId", userAuthenticated, userController.deleteUser);

module.exports = router;