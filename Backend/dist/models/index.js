"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Appointment_models_1 = require("./Appointment.models");
const Doctor_model_1 = require("./Doctor.model");
const Patient_model_1 = require("./Patient.model");
const Profile_model_1 = require("./Profile.model");
const models = [Profile_model_1.initProfileModel, Patient_model_1.initPatientModel, Doctor_model_1.initDoctorModel, Appointment_models_1.initAppointmentModel];
const startSequelize = (db_name, db_password, db_hostname, db_username) => {
    exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
        dialect: "postgres",
        host: db_hostname,
        logging: false,
    });
    for (const model of models) {
        model(exports.sequelize);
    }
    exports.sequelize.sync(); //{force: true}
};
exports.startSequelize = startSequelize;
