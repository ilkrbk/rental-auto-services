const dbConfig = require("./db.config");
const Sequelize = require("sequelize");

class DB {
  dbConfig;
  Sequelize;
  constructor() {
    this.dbConfig = dbConfig;
    this.Sequelize = Sequelize;
  }

  getInstance() {
    const sequelize = new Sequelize(
      dbConfig.DB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,

        pool: {
          max: dbConfig.pool.max,
          min: dbConfig.pool.min,
          acquire: dbConfig.pool.acquire,
          idle: dbConfig.pool.idle,
        },
      }
    );
    const db = {};
    db.car = sequelize.define("car", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      brand: { type: Sequelize.STRING, allowNull: false },
      model: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.INTEGER, allowNull: false },
    });

    db.client = sequelize.define("client", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
      drivingLicense: { type: Sequelize.STRING, allowNull: false },
      dateLicense: { type: Sequelize.DATE, allowNull: false },
      passport: { type: Sequelize.STRING, allowNull: false },
      birthDate: { type: Sequelize.DATE, allowNull: false },
      contractCount: { type: Sequelize.INTEGER },
      isDiscount: { type: Sequelize.BOOLEAN },
    });

    db.contract = sequelize.define("contract", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      dateActive: { type: Sequelize.DATE, allowNull: false },
    });

    db.contragent = sequelize.define("contragent", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
      carAmount: { type: Sequelize.INTEGER, allowNull: false },
    });

    return db;
  }
}

module.exports = DB;
