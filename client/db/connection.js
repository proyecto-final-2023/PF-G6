const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:cake9000@localhost:5432/final_project"
);

module.exports = sequelize;
