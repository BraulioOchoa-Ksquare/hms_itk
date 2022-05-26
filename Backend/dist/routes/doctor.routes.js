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
exports.DoctorRoute = (0, express_1.Router)();
exports.DoctorRoute.post('/createDoctor', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
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
        const doctorCreated = yield (0, doctor_handlers_1.createDoctor)(professionalLicense, speciality, ProfileId);
        res.statusCode = 201;
        res.send({ doctorCreated });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
