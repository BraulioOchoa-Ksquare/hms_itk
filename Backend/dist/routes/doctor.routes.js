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
exports.DoctorRoute = void 0;
//Esta ruta usa la logica de handlers
const express_1 = require("express");
const doctor_handlers_1 = require("../handlers/doctor.handlers");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const Appointment_models_1 = require("../models/Appointment.models");
exports.DoctorRoute = (0, express_1.Router)();
exports.DoctorRoute.post('/profile', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { professionalLicense, speciality, ProfileId } = req.body;
    if (!professionalLicense || !speciality) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    try {
        const profileCreated = yield (0, doctor_handlers_1.profileDoctor)(professionalLicense, speciality, ProfileId);
        res.statusCode = 201;
        res.send({ profileCreated });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.DoctorRoute.get('/search/:DoctorId', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DoctorId } = req.params;
        const { date, PatientId } = JSON.parse(req.query.where || "{}");
        const where = { date, PatientId, DoctorId };
        Object.keys(where).forEach((key) => {
            where[key] === undefined ? delete where[key] : {};
        });
        const order = req.query;
        let orderString = "ASC";
        orderString = String(order.order);
        orderString = orderString.slice(1, -1);
        if (orderString !== "DESC") {
            orderString = "ASC";
        }
        const searchDoctorApp = yield Appointment_models_1.Appointment.findAll({
            where,
            order: [["id", orderString]]
        });
        res.statusCode = 201;
        res.send({ searchDoctorApp });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
