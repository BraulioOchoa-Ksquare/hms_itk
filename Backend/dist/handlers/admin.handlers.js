"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.appointmentListAll = exports.getListDoctors = exports.getListPatients = exports.disableUser = exports.createUserDoctor = void 0;
const admin = __importStar(require("firebase-admin"));
const Appointment_models_1 = require("../models/Appointment.models");
const Doctor_model_1 = require("../models/Doctor.model");
const Patient_model_1 = require("../models/Patient.model");
const Profile_model_1 = require("../models/Profile.model");
const createUserDoctor = (displayName, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = yield admin.auth().createUser({
        displayName: displayName,
        email: email,
        password: password
    });
    yield admin.auth().setCustomUserClaims(uid, {
        role
    });
    return uid;
});
exports.createUserDoctor = createUserDoctor;
const mapToUser = (user) => {
    const customClaims = (user.customClaims || { role: "" });
    const role = customClaims.role ? customClaims.role : "";
    return {
        uid: user.uid,
        email: user.email,
        role,
        isInactive: user.disabled,
    };
};
const disableUser = (uid, disabled) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield admin.auth().updateUser(uid, { disabled });
    return mapToUser(user);
});
exports.disableUser = disableUser;
const getListPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getListPatients = yield Patient_model_1.Patient.findAll({
            include: [{
                    model: Profile_model_1.Profile,
                    required: true
                }]
        });
        return getListPatients;
    }
    catch (error) {
        throw error;
    }
});
exports.getListPatients = getListPatients;
const getListDoctors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getListDoctors = yield Doctor_model_1.Doctor.findAll({
            include: [{
                    model: Profile_model_1.Profile,
                    required: true
                }]
        });
        return getListDoctors;
    }
    catch (error) {
        throw error;
    }
});
exports.getListDoctors = getListDoctors;
const appointmentListAll = (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentsListed = yield Appointment_models_1.Appointment.findAll({ order: ["id"], limit: limit, offset: offset });
        return appointmentsListed;
    }
    catch (error) {
        throw error;
    }
});
exports.appointmentListAll = appointmentListAll;
