const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Events extends Model { }

Events.init({
    // add properites here, ex:
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataSource: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize
});

module.exports = Pet