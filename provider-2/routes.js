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
    router.post("/car", this.rentalController.createCar);
    router.get("/price-list/car", this.rentalController.findAllCars);
    router.get("/details/car/:id", this.rentalController.findOneCar);
    router.put("/car/:id", this.rentalController.updateCar);
    router.delete("/car/:id", this.rentalController.deleteCar);

    this.rentalApp.use("/rental", router);
  }
}

module.exports = Routes;
