const userController = require("../controllers/user");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/addUser", userController.addUser);
userRouter.post("/login", userController.login);
module.exports = userRouter;
