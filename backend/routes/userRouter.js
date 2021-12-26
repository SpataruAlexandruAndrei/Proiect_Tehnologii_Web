const userController = require("../controllers/user");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/addUser", userController.addUser);
userRouter.post("/login", userController.login);
userRouter.get("/getUserByEmail", userController.getUserByEmail);
userRouter.get("/getAllUsers", userController.getAllUsers);
module.exports = userRouter;
