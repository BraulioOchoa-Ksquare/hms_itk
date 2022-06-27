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
exports.getProfilePatient = exports.patientProfile = void 0;
//logica
const Patient_model_1 = require("../models/Patient.model");
const Profile_model_1 = require("../models/Profile.model");
const patientProfile = (gender, birthDate, age, ProfileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientProfile = yield Patient_model_1.Patient.create({ gender, birthDate, age, ProfileId });
        return patientProfile;
    }
    catch (error) {
        throw error;
    }
});
exports.patientProfile = patientProfile;
const getProfilePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProfilePatient = yield Patient_model_1.Patient.findOne({
            where: { ProfileId: id },
            include: [{
                    model: Profile_model_1.Profile,
                    required: true
                }]
        });
        return getProfilePatient;
    }
    catch (error) {
        throw error;
    }
});
exports.getProfilePatient = getProfilePatient;
