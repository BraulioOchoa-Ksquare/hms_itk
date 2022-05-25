"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentModel = exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const Doctor_model_1 = require("./Doctor.model");
const Patient_model_1 = require("./Patient.model");
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
const initAppointmentModel = (sequelize) => {
    Appointment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        hour: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize, // Instance of sequelize that reflects a connection
    });
    Appointment.belongsTo(Doctor_model_1.Doctor);
    Appointment.belongsTo(Patient_model_1.Patient);
};
exports.initAppointmentModel = initAppointmentModel;
