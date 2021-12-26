const express = require("express");
const userRouter = require("./userRouter");
const dbRouter = require("./dbRouter");
const feedbackRouter = require("./feedbackRouter");
const router = express.Router();

router.use("/user", userRouter);
router.use("/", dbRouter);
router.use("/feedback",feedbackRouter);

module.exports = router;
