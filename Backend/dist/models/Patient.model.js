"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPatientModel = exports.Patient = void 0;
const sequelize_1 = require("sequelize");
const Profile_model_1 = require("./Profile.model");
class Patient extends sequelize_1.Model {
}
exports.Patient = Patient;
const initPatientModel = (sequelize) => {
    Patient.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        gender: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        age: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize, // Instance of sequelize that reflects a connection
    });
    Patient.belongsTo(Profile_model_1.Profile);
};
exports.initPatientModel = initPatientModel;
