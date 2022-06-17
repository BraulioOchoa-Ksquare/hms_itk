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
exports.UserRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    try {
        const userCreated = yield (0, methods_1.createUser)(displayName, email, password, "patient");
        res.statusCode = 201;
        res.send({ userCreated });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRoute.get('/list', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersListed = yield (0, methods_1.getAllUsers)();
        res.statusCode = 201;
        res.send({ usersListed });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRoute.get('/:uid', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const userPerUid = yield (0, methods_1.userUid)(uid);
        res.statusCode = 201;
        res.send({ userPerUid });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRoute.delete('/:uid', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
    roles: ["admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        yield (0, methods_1.deleteUser)(uid);
        res.statusCode = 201;
        res.send(`User with the id: ${uid}, was deleted successfully`);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRoute.patch('/disable/:uid', isAuthenticated_1.isAuthenticated, (0, hasRole_1.hasRole)({
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
        res.status(500).send({ error: "something went wrong" });
    }
}));
