const express = require("express");
const cors = require("cors");
const DB = require("./models");
const dfd = require("danfojs-node");
const Routes = require("./routes");
const Pool = require("pg").Pool;

const app = express();

var corsOptions = { origin: "http://localhost:3000" };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rentalDB = new DB();
const db = rentalDB.getInstance();
db.sequelize.sync();

const rentalRoutes = new Routes(app);
rentalRoutes.Init();

const pool = new Pool({
  user: "ilkrbk",
  password: "0608",
  host: "localhost",
  port: "5432",
  database: "provider1",
});

function ReadCar() {
  dfd
    .read_csv(
      "/Users/ilkrbk/Documents/KPI-study/3_class/KPI-3/app/data-provider1.csv"
    )
    .then((df) => {
      df.drop({
        columns: [
          "id",
          "vin",
          "miles",
          "stock_no",
          "year",
          "trim",
          "body_type",
          "vehicle_type",
          "drivetrain",
          "transmission",
          "fuel_type",
          "engine_size",
          "engine_block",
          "seller_name",
          "street",
          "city",
          "state",
          "zip",
        ],
        axis: 1,
        inplace: true,
      });
      df = df.dropna(0);
      for (let i = 0; i < df["$data"].length; i++) {
        if (df["$data"][i][0] && df["$data"][i][1] && df["$data"][i][2]) {
          AddDataInCar(df["$data"][i][1], df["$data"][i][2], df["$data"][i][0]);
        } else {
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function AddDataInCar(Brand, Model, Price) {
  console.log(Brand, Model, Price);
  pool.query(
    `INSERT INTO Cars(brand, model, price, "createdAt", "updatedAt") VALUES ('${Brand}', '${Model}', '${Price}', '${new Date().toUTCString()}', '${new Date().toUTCString()}')`,
    (err, data) => {
      console.log(data);
      if (err) return console.log(data, err);
    }
  );
}

// ReadCar();

app.listen(8081, () => {
  console.log(`Server is running on port 8081.`);
});
