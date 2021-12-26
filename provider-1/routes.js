const Controller = require("./controller");
const router = require("express").Router();

class Routes {
  rentalApp;
  rentalController;
  constructor(app) {
    this.rentalApp = app;
    this.rentalController = new Controller();
  }

  Init() {
    router.get("/search", this.rentalController.findCarsByBrand);
    router.get("/price-list/car", this.rentalController.findAllCars);

    this.rentalApp.use("/rental", router);
  }
}

module.exports = Routes;
