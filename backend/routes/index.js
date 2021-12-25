const express = require("express");
const userRouter = require("./userRouter");
const dbRouter = require("./dbRouter");
const router = express.Router();

router.use("/user", userRouter);
router.use("/", dbRouter);

module.exports = router;
