"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProfileModel = exports.Profile = void 0;
const sequelize_1 = require("sequelize");
class Profile extends sequelize_1.Model {
}
exports.Profile = Profile;
const initProfileModel = (sequelize) => {
    Profile.init({
        uid: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: true,
            allowNull: false,
        },
    }, {
        sequelize, // Instance of sequelize that reflects a connection
    });
};
exports.initProfileModel = initProfileModel;
