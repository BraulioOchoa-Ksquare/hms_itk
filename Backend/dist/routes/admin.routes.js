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
exports.AdminRoute = void 0;
const express_1 = require("express");
const methods_1 = require("../firebase/methods");
const admin_handlers_1 = require("../handlers/admin.handlers");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const Appointment_models_1 = require("../models/Appointment.models");
exports.AdminRoute = (0, express_1.Router)();
exports.AdminRoute.post('/', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: [""],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    try {
        const userCreated = yield (0, methods_1.createUser)(displayName, email, password, "admin");
        res.statusCode = 201;
        res.send(userCreated);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AdminRoute.post('/userDoctor', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    try {
        const userDoctorCreated = yield (0, methods_1.createUser)(displayName, email, password, "doctor");
        res.statusCode = 201;
        res.send(userDoctorCreated);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AdminRoute.patch('/activateUser/:userId', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const userActivated = yield (0, admin_handlers_1.disableUser)(uid, false);
        res.statusCode = 201;
        res.send(userActivated);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AdminRoute.get('/appointmentList/', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset } = req.query;
    try {
        const appointmentsListed = yield (0, admin_handlers_1.appointmentListAll)(limit ? +limit : 10, offset ? +offset : 0);
        res.statusCode = 201;
        res.send(appointmentsListed);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AdminRoute.get('/patients/', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPatients = yield (0, admin_handlers_1.getListPatients)();
        res.statusCode = 200;
        res.send(listPatients);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AdminRoute.get('/doctors/', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin", "patient"],
    allowSameUser: false,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listDoctors = yield (0, admin_handlers_1.getListDoctors)();
        res.statusCode = 200;
        res.send(listDoctors);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
//Filter by PatientId, DoctorId, status and order by ASC and DESC
exports.AdminRoute.get('/search/', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PatientId, DoctorId, status } = JSON.parse(req.query.where || "{}");
        const where = { PatientId, DoctorId, status };
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
        const searchAdminApp = yield Appointment_models_1.Appointment.findAll({
            where,
            order: [["id", orderString]]
        });
        res.statusCode = 201;
        res.send(searchAdminApp);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
