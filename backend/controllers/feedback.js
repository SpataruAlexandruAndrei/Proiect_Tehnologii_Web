const FeedbackDB = require("../models/Feedback");

const controller = {
  addFeedback: async (req, res) => {
    try {
      //console.log(req.body);
      const feedback = {
        ID_USER: req.body.id,
        STARTING_POINT: req.body.startingPoint,
        FINISHING_POINT: req.body.finishingPoint,
        TRANSPORT_MEAN: req.body.transportMean,
        DEPARTURE_TIME: req.body.departureTime,
        DURATION: req.body.duration,
        CONGESTION_LEVEL: req.body.congestionLevel,
        OBSERVATIONS: req.body.observations,
        SATISFACTION_LEVEL: req.body.satisfactionLevel,
      };
      //console.log(feedback);
      let errors = {};

      //Validari
      if (
        !feedback.STARTING_POINT ||
        !feedback.FINISHING_POINT ||
        !feedback.TRANSPORT_MEAN ||
        !feedback.DEPARTURE_TIME ||
        !feedback.DURATION ||
        !feedback.CONGESTION_LEVEL ||
        !feedback.OBSERVATIONS ||
        !feedback.SATISFACTION_LEVEL ||
        !feedback.ID_USER
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
          res.status(500).send(errors);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  findAllFeedback: async (req, res) => {
    FeedbackDB.findAll()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving feedbacks.",
        });
      });
  },

  findAll: async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    FeedbackDB.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving feedbacks.",
        });
      });
  },
  findAllForUser: async (req, res) => {
    FeedbackDB.findAll({ where: { ID_USER: req.headers.id } })
      .then((data) => {
        if (data) {
          res.status(200).send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Feedback with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Feedback with id=" + id,
        });
      });
  },

  findFeedbackByID: async (req, res) => {
    FeedbackDB.findOne({ where: { id: req.headers.id } })
      .then((data) => {
        if (data) {
          res.status(200).send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Feedback with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Feedback with id=" + id,
        });
      });
  },

  delete: async (req, res) => {
    if (req.headers.id) {
      const feedback = await FeedbackDB.findOne({
        where: { id: req.headers.id },
      });
      if (feedback) {
        try {
          await feedback.destroy();
          res
            .status(200)
            .send({ message: "Feedback-ul a fost sters cu succes" });
        } catch {
          res.status(500).send({ message: "Server error" });
        }
      } else {
        res.status(400).send({ message: "Nu exista feedback-ul cautat" });
      }
    } else {
      res.status(400).send({ message: "Pune-n plm id-ul pe head!" });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;

    FeedbackDB.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Feedback was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Feedback with id=${id}. Maybe Feedback was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Feedback with id=" + id,
        });
      });
  },
  // delete: async (req, res) => {
  //   const id = req.params.id;

  //   FeedbackDB.destroy({
  //     where: { id: id },
  //   })
  //     .then((num) => {
  //       if (num == 1) {
  //         res.send({
  //           message: "Feedback was deleted successfully!",
  //         });
  //       } else {
  //         res.send({
  //           message: `Cannot delete Feedback with id=${id}. Maybe Feedback was not found!`,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: "Could not delete Feedback with id=" + id,
  //       });
  //     });
  // },
  deleteAll: async (req, res) => {
    FeedbackDB.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Feedbacks were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials.",
        });
      });
  },
};

module.exports = controller;
