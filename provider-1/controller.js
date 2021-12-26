const DB = require("./models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

class Controller {
  db;
  constructor() {
    this.db = new DB().getInstance();
  }

  findCarsByBrand = (req, res) => {
    setTimeout(() => {
      const brand = req.query.brand;
      const condition = brand ? { brand: { [Op.iLike]: `%${brand}%` } } : null;

      this.db.car
        .findAll({ where: condition })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving cars.",
          });
        });
    }, 25000);
  };

  findAllCars = (req, res) => {
    setTimeout(() => {
      this.db.car
        .findAll()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving cars.",
          });
        });
    }, 5000);
  };
}

module.exports = Controller;
