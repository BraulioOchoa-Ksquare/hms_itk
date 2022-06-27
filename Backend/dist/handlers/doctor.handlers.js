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
exports.getProfileDoctor = exports.profileDoctor = void 0;
//logica
const Doctor_model_1 = require("../models/Doctor.model");
const Profile_model_1 = require("../models/Profile.model");
const profileDoctor = (professionalLicense, speciality, ProfileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileDoctor = yield Doctor_model_1.Doctor.create({ professionalLicense, speciality, ProfileId });
        return profileDoctor;
    }
    catch (error) {
        throw error;
    }
});
exports.profileDoctor = profileDoctor;
const getProfileDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProfileDoctor = yield Doctor_model_1.Doctor.findOne({
            where: { ProfileId: id },
            include: [{
                    model: Profile_model_1.Profile,
                    required: true
                }]
        });
        return getProfileDoctor;
    }
    catch (error) {
        throw error;
    }
});
exports.getProfileDoctor = getProfileDoctor;
