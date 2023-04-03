const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("procontacts_db", "root", "Pa9724693", {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;