const {DataTypes} = require("sequelize");

const sequelize = require("../config/databse");

const Contact = require("./contact");

const Label = sequelize.define("Label", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Label.belongsToMany(Contact);
Contact.hasMany(Label);

module.exports = Label;