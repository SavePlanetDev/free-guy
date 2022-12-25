require("dotenv");
const { Sequelize } = require("sequelize");
const { postgres_user, postgres_pwd, postgres_db, production } = process.env;

const sequelize = new Sequelize("cardano-db-1", "non", "non", {
  host: production == "PROD" ? "ip-address" : "localhost",
  port: 5435,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("PSQL: Authorized!"))
  .catch((e) => console.log(e));
sequelize
  .sync()
  .then(() => console.log("PSQL: Synced!"))
  .catch((e) => console.log(e));

module.exports = { sequelize };
