const express = require("express");

const userController = require("../controllers/userController");
const {userAuthenticated} = require("../middlewares/userAuth");

const router = express.Router();

// @desc    get all users
// @route   GET /user/all
// router.get("/", userController.getAllUsers)

// @desc    get user's info
// @route   GET /user/all
router.get("/:userId", userAuthenticated, userController.getUser);

// @desc    create new user
// @route   POST /user/register
router.post("/", userController.createUser);

// @desc    handle login
// @route   POST /user/login
router.post("/login", userController.handleLogin);

// @desc    handle update user
// @route   PUT /user/update
router.put("/:userId", userAuthenticated, userController.updateUser);

// @desc    handle login
// @route   PUT /user/update
router.delete("/:userId", userAuthenticated, userController.deleteUser);

module.exports = router;