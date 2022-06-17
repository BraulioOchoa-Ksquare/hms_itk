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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./models/index");
const dotenv_1 = __importDefault(require("dotenv"));
const admin = __importStar(require("firebase-admin"));
const user_routes_1 = require("./routes/user.routes");
const profile_routes_1 = require("./routes/profile.routes");
const patient_routes_1 = require("./routes/patient.routes");
const doctor_routes_1 = require("./routes/doctor.routes");
const appointment_routes_1 = require("./routes/appointment.routes");
const admin_routes_1 = require("./routes/admin.routes");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
admin.initializeApp();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOSTNAME;
// Middlewares //
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes //
app.use("/user", user_routes_1.UserRoute);
app.use("/profile", profile_routes_1.ProfileRoute);
app.use("/patient", patient_routes_1.PatientRoute);
app.use("/doctor", doctor_routes_1.DoctorRoute);
app.use("/appointment", appointment_routes_1.AppointmentRoute);
app.use("/admin", admin_routes_1.AdminRoute);
app.get("/", (req, res) => {
    res.send(req.originalUrl);
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, index_1.startSequelize)(db_name, db_password, db_host, db_username);
        console.log("Up and running!!!");
    }
    catch (error) {
        console.error(error);
        process.abort();
    }
}));
