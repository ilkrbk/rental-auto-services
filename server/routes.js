const Controller = require("./controller");
const router = require("express").Router();
const Memcached = require("memcached");
const memcached = new Memcached("127.0.0.1:11211", {
  timeout: 200,
  maxTimeout: 1000000,
  minTimeout: 1,
});

const cache = (duration) => {
  return (req, res, next) => {
    console.log("duration...");
    const key = `_template_${req.url}`;
    memcached.get(key, (err, cacheBody) => {
      console.log(cacheBody);
      if (cacheBody) {
        res.send(cacheBody);
      } else {
        if (err) {
          console.error(err);
        }
        res.sendResponse = res.send;
        res.send = (body) => {
          memcached.set(key, body, duration, (err) => {
            if (err) {
              console.error(err);
            }
            res.sendResponse(body);
          });
        };
        next();
      }
    });
  };
};

class Routes {
  rentalApp;
  rentalController;
  constructor(app) {
    this.rentalApp = app;
    this.rentalController = new Controller();
  }
  Init() {
    router.post("/car", this.rentalController.createCar);
    router.get(
      "/price-list/car",
      cache(40000),
      this.rentalController.findAllCars
    );
    router.get("/details/car/:id", this.rentalController.findOneCar);
    router.put("/car/:id", this.rentalController.updateCar);
    router.delete("/car/:id", this.rentalController.deleteCar);

    this.rentalApp.use("/rental", router);
  }
}

module.exports = Routes;
