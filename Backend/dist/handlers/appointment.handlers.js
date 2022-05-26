"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDateHourApp = exports.appointmentListDoctor = exports.appointmentDisabledPatient = exports.appointmentReadPatient = exports.appointmentListPatient = exports.createAppointment = void 0;
//logica
const Appointment_models_1 = require("../models/Appointment.models");
//========================= PATIENTS ==================================
const createAppointment = (date, hour, DoctorId, PatientId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentCreated = yield Appointment_models_1.Appointment.create({ date, hour, DoctorId, PatientId, status });
        console.log("Appointment created successfully");
        return appointmentCreated;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createAppointment = createAppointment;
const appointmentListPatient = (id, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentList = yield Appointment_models_1.Appointment.findAll({ where: { PatientId: id }, limit: limit, offset: offset });
        console.log("Appontment list");
        return appointmentList;
    }
    catch (error) {
        console.log(error);
    }
});
exports.appointmentListPatient = appointmentListPatient;
const appointmentReadPatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentRead = yield Appointment_models_1.Appointment.findByPk(id);
        console.log("Appontment created successfully");
        return appointmentRead;
    }
    catch (error) {
        console.log(error);
    }
});
exports.appointmentReadPatient = appointmentReadPatient;
const appointmentDisabledPatient = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentDisabled = yield Appointment_models_1.Appointment.update({ status: status }, { where: { id: id } });
        console.log("Appontment was disables correctly");
        return appointmentDisabled;
    }
    catch (error) {
        console.log(error);
    }
});
exports.appointmentDisabledPatient = appointmentDisabledPatient;
//============================ END PATIENTS ==================================
//============================ DOCTORS ==================================
const appointmentListDoctor = (id, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentList = yield Appointment_models_1.Appointment.findAll({ where: { DoctorId: id }, limit: limit, offset: offset });
        console.log("Appointment list");
        return appointmentList;
    }
    catch (error) {
        console.log(error);
    }
});
exports.appointmentListDoctor = appointmentListDoctor;
const updateDateHourApp = (id, date, hour) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentUpdated = yield Appointment_models_1.Appointment.update({ date: date, hour: hour }, { where: { id: id } });
        console.log("The date and the hour were updated successfully");
        return appointmentUpdated;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateDateHourApp = updateDateHourApp;
