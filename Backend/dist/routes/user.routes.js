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
exports.UserRoute = void 0;
const express_1 = require("express");
const methods_1 = require("../firebase/methods");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
exports.UserRoute = (0, express_1.Router)();
exports.UserRoute.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.UserRoute.patch('/disableUser/:uid', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const userDisabled = yield (0, methods_1.disableUser)(uid, true);
        res.statusCode = 201;
        res.send({ userDisabled });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
