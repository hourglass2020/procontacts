const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("procontacts_db", "root", process.env.MYSQL_PASSWORD, {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;