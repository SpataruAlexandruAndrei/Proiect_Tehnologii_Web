const FeedbackDB = require("../models/Feedback");
const bcryptjs = require("bcryptjs");

const controller = {
  addFeedback: async (req, res) => {
      try {
        const feedback = {
          startingPoint: req.body.startingPoint,
          finishingPoint: req.body.finishingPoint,
          transportMean: req.body.transportMean,
          departureTime: req.body.departureTime,
          duration: req.body.duration,
          congestionLevel: req.body.congestionLevel,
          observations: req.body.observations,
          satisfactionLevel: req.body.satisfactionLevel,
        };

        let errors = {};

        //Validari
        if (
          !feedback.startingPoint ||
          !feedback.finishingPoint ||
          !feedback.transportMean ||
          !feedback.departureTime ||
          !feedback.duration ||
          !feedback.congestionLevel ||
          !feedback.observations ||
          !feedback.satisfactionLevel
        ) {
          console.log("Nu au fost completate toate campurile!");
          errors.campuriGoale = "Nu au fost completate toate campurile!";
        } else {
          if (Object.keys(errors).length === 0) {
            const feedbackCreated = await FeedbackDB.create(feedback);
            res.status(200).json({
                feedbackCreated,
              created: true,
            });
          } else {
            res.status(400).send(errors);
          }
        }
      } catch (error) {
        console.log(error);
      }
    
  },
};

module.exports = controller;
