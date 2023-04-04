const {DataTypes} = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = require("../config/databse");
const {createError} = require("../utils/errorParser");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    hooks:{
        beforeCreate(user, options) {
            if(user.isNewRecord){
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(user.getDataValue("password"), salt);

                user.setDataValue("password", hash);
            }
        }
    }
});

module.exports = User;