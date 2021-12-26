const DB = require("./models");

class Controller {
  db;
  constructor() {
    this.db = new DB().getInstance();
  }

  findCarsByBrand = (req, res) => {
    const brand = req.query.brand;
    const condition = brand ? { brand: { [Op.iLike]: `%${brand}%` } } : null;

    this.db.car
      .findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving cars.",
        });
      });
  };

  createCar = (req, res) => {
    if (!req.body.brand || !req.body.model || !req.body.price) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    const car = {
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
    };

    this.db.car
      .create(car)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the car.",
        });
      });
  };

  findAllCars = (req, res) => {
    this.db.car
      .findAll({ offset: req.query.offset * 5000, limit: 5000 })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving cars.",
        });
      });
  };

  findOneCar = (req, res) => {
    const id = req.params.id;

    this.db.car
      .findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Car with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Car with id=" + id,
        });
      });
  };

  updateCar = (req, res) => {
    const id = req.params.id;

    this.db.car
      .update(req.body, {
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Car was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Car with id=" + id,
        });
      });
  };

  deleteCar = (req, res) => {
    const id = req.params.id;
    this.db.car
      .destroy({
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Car was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Car with id=" + id,
        });
      });
  };
}

module.exports = Controller;
