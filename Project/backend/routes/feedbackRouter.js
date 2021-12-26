const feedbackController = require("../controllers/feedback");
const express = require("express");
const feedbackRouter = express.Router();

feedbackRouter.post("/addFeedback", feedbackController.addFeedback);

module.exports = feedbackRouter;
