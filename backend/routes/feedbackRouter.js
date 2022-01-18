const feedbackController = require("../controllers/feedback");
const express = require("express");
const feedbackRouter = express.Router();

feedbackRouter.post("/addFeedback", feedbackController.addFeedback);
feedbackRouter.get("/listFeedbacks", feedbackController.findAll);
feedbackRouter.get("/findAllFeedback", feedbackController.findAllFeedback);
feedbackRouter.get("/feedbackForOneUser", feedbackController.findAllForUser);
feedbackRouter.get("/findFeedbackByID", feedbackController.findFeedbackByID);
// feedbackRouter.get("/listFeedback/:id", feedbackController.findOne);
feedbackRouter.put("/updateFeedback/:id", feedbackController.update);
feedbackRouter.delete("/deleteFeedbacks", feedbackController.deleteAll);
feedbackRouter.delete("/deleteFeedback", feedbackController.delete);
// feedbackRouter.delete("/deleteFeedback/:id", feedbackController.delete);

module.exports = feedbackRouter;
