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
exports.PatientRoute = void 0;
//Esta ruta usa la logica de handlers
const express_1 = require("express");
const patient_handlers_1 = require("../handlers/patient.handlers");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.PatientRoute = (0, express_1.Router)();
exports.PatientRoute.post('/profile/:userId', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gender, birthDate, age, ProfileId } = req.body;
    if (!gender || !birthDate || !age) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    try {
        const profileCreated = yield (0, patient_handlers_1.patientProfile)(gender, birthDate, age, ProfileId);
        res.statusCode = 201;
        res.send(profileCreated);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.PatientRoute.get('/profile/:id/:userId/', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: true,
}), // Solamente el SU pueda acceder
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patientProfile = yield (0, patient_handlers_1.getProfilePatient)(+id);
        res.statusCode = 200;
        res.send(patientProfile);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
