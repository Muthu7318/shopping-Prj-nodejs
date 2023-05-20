const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Muthu@7318", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
