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
          userID:req.body.userID,
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
          !feedback.satisfactionLevel ||
          !feedback.userID
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
  findAll: async (req, res) => {
    const title = req.query.title;
      var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    
      FeedbackDB.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving feedbacks."
          });
        });
  },
  findOne: async (req, res) => {
    const id = req.params.id;
  
    FeedbackDB.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Feedback with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Feedback with id=" + id
        });
      });
  },
  update: async (req, res) => {
    const id = req.params.id;
  
    FeedbackDB.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Feedback was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Feedback with id=${id}. Maybe Feedback was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Feedback with id=" + id
        });
      });
  },
  delete: async (req, res) => {
    const id = req.params.id;
  
    FeedbackDB.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Feedback was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Feedback with id=${id}. Maybe Feedback was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Feedback with id=" + id
        });
      });
  },
  deleteAll: async (req, res) => {
    FeedbackDB.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Feedbacks were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  },
};

module.exports = controller;
