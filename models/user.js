const {DataTypes} = require("sequelize");

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
}, {
    hooks: {
        beforeCreate(user, options) {
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) {
                    const error = createError("Problem in hashing password", 501);
                    throw error;
                }
                user.password = hash;
            })
        }
    }
});


module.exports = User