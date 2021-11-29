const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        }
    },
    zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [5],
        }
    }
}, {
    sequelize,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 5);
            return userObj;
        }
    }
});

module.exports = User;