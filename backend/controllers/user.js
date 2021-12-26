const UserDB = require("../models/User");
const bcryptjs = require("bcryptjs");

const controller = {
  addUser: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).send("Nu exista email!");
      }
      const user = await UserDB.findOne({ where: { email: req.body.email } });

      if (user) {
        res.status(409).send({
          message: "Email-ul exista, te rog introdu alt email!",
        });
      }
      try {
        const user = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
        };

        let errors = {};

        //Validari
        if (
          !user.lastName ||
          !user.firstName ||
          !user.email ||
          !user.phone ||
          !user.password
        ) {
          console.log("Nu au fost completate toate campurile!");
          errors.campuriGoale = "Nu au fost completate toate campurile!";
        } else {
          if (user.lastName.lenght < 2) {
            errors.nume =
              "Numele introdus trebuie sa contina mai mult de 2 caractere";
          }

          if (user.firstName.lenght < 2) {
            errors.prenume =
              "Prenumele introdus trebuie sa contina mai mult de 2 caractere";
          }

          if (user.phone.length != 10) {
            errors.telefon = "Numarul de telefon trebuie sa fie de 10 cifre!";
          } else if (!user.phone.match("^[0-9]+$")) {
            errors.telefon2 =
              "Numarul de telefon trebuie sa contina doar cifre!";
          }
          if (Object.keys(errors).length === 0) {
            const userCreated = await UserDB.create(user);
            res.status(200).json({
              userCreated,
              created: true,
            });
          } else {
            res.status(400).send(errors);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: (req, res) => {
    UserDB.findOne({ where: { email: req.body.email } })
      .then((user) => {
        const { parola } = req.body;
        if (user === null) {
          res.status(401).send({
            message: "Nu exista acest cont!!",
          });
        } else {
          if (parola === user.password) {
            bcryptjs.compare(req.body.password, user.password, (result) => {
              if (result) {
                res.status(200).send({
                  message: "Te-ai autentificat cu succes!",
                  login: true,
                });
              }
            });
          } else {
            res.status(401).send({
              message: "Parola gresita!2",
            });
          }
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: "A crapat serveru!",
        });
      });
  },

  getUserByEmail: async (req, res) => {
    UserDB.findOne({ where: { email: req.body.email } })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => res.status(500).send(err));
  },

  getAllUsers: async (req, res) => {
    UserDB.findAll()
      .then((users) => res.status(200).send(users))
      .catch((err) => res.status(500).send(err));
  },
};

module.exports = controller;
