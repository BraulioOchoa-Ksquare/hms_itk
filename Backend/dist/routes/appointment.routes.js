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
exports.AppointmentRoute = void 0;
//Esta ruta usa la logica de handlers
const express_1 = require("express");
const appointment_handlers_1 = require("../handlers/appointment.handlers");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.AppointmentRoute = (0, express_1.Router)();
//========================= PATIENTS ==================================
exports.AppointmentRoute.post('/', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["patient"],
    allowSameUser: false,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, hour, DoctorId, PatientId } = req.body;
    if (!date || !hour || !DoctorId || !PatientId) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    try {
        const appointmentCreated = yield (0, appointment_handlers_1.createAppointment)(date, hour, DoctorId, PatientId, true);
        res.statusCode = 201;
        res.send({ appointmentCreated });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRoute.get('/list/:id', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { limit, offset } = req.query;
    try {
        const appointmentList = yield (0, appointment_handlers_1.appointmentListPatient)(+id, limit ? +limit : 10, offset ? +offset : 0);
        res.statusCode = 201;
        res.send({ appointmentList });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRoute.get('/:id', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointmentRead = yield (0, appointment_handlers_1.appointmentReadPatient)(+id);
        res.statusCode = 201;
        res.send({ appointmentRead });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRoute.patch('/cancel/:id', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const status = false;
    try {
        yield (0, appointment_handlers_1.appointmentDisabledPatient)(+id, status);
        res.statusCode = 201;
        res.send(`The appointment with the id: ${id} has been cancelled.`);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
//========================= END PATIENTS ==================================
//========================= DOCTOR ==================================
exports.AppointmentRoute.get('/list/:id', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { limit, offset } = req.query;
    try {
        const appointmentList = yield (0, appointment_handlers_1.appointmentListDoctor)(+id, limit ? +limit : 10, offset ? +offset : 0);
        res.statusCode = 201;
        res.send({ appointmentList });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRoute.patch('/update/:id', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { date, hour } = req.body;
    try {
        yield (0, appointment_handlers_1.updateDateHourApp)(+id, date, hour);
        res.statusCode = 201;
        res.send(`The appointment with the id: ${id} has been updated.`);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
//========================= END DOCTOR ==================================
