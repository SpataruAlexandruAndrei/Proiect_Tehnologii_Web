const db = require("../config/db");
const Sequelize = require("sequelize");

const Feedback = db.define(
  "feedback",
  {
    startingPoint: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    finishingPoint: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    transportMean: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    departureTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    congestionLevel: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    observations: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    satisfactionLevel: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Feedback;
