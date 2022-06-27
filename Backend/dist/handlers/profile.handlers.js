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
exports.profilePerId = exports.createProfile = void 0;
//logica 
const Profile_model_1 = require("../models/Profile.model");
const createProfile = (uid, id, firstName, lastName, address, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileCreated = yield Profile_model_1.Profile.create({ uid, id, firstName, lastName, address, phoneNumber });
        return profileCreated;
    }
    catch (error) {
        throw error;
    }
});
exports.createProfile = createProfile;
const profilePerId = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = yield Profile_model_1.Profile.findOne({
            where: { uid: uid }
        });
        return profileId;
    }
    catch (error) {
        throw error;
    }
});
exports.profilePerId = profilePerId;
