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
exports.createUserRoute = void 0;
const express_1 = require("express");
const methods_1 = require("../firebase/methods");
// import { hasRole } from "../middlewares/hasRole";
// import { isAuthenticated } from "../middlewares/isAuthenticated";
exports.createUserRoute = (0, express_1.Router)();
exports.createUserRoute.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password, role } = req.body;
    if (!displayName || !email || !password || !role) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    if (role !== "patient") {
        res.status(400);
        return res.send({ error: "Invalid role" });
    }
    try {
        const userCreated = yield (0, methods_1.createUser)(displayName, email, password, role);
        res.statusCode = 201;
        res.send({ userCreated });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
