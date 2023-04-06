const {DataTypes} = require("sequelize");

const sequelize = require("../config/databse");

const Contact = require("./contact");
const User = require("./user");

const Label = sequelize.define("Label", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

Label.belongsToMany(Contact, {through: "Contact_Labels"});
Contact.belongsToMany(Label, {through: "Contact_Labels"});
User.hasMany(Label);
// await sequelize.sync({force: true});

module.exports = Label;