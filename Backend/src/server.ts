import express, { Request, Response } from "express";
import { startSequelize } from "./models/index";
import dotenv from "dotenv";
import { createUserRoute } from "./routes/user.routes";
import * as admin from "firebase-admin";
import { createProfileRoute } from "./routes/profile.routes";
import { createPatientRoute } from "./routes/patient.routes";
import { createDoctorRoute } from "./routes/doctor.routes";
import { createAppointmentRoute } from "./routes/appointment.routes";

dotenv.config();
admin.initializeApp();

const app = express();

const port = process.env.PORT || 3000;
const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_host = <string>process.env.DB_HOSTNAME;

// Middlewares //

app.use(express.json());

// Routes //
app.use("/user", createUserRoute);
app.use("/profile", createProfileRoute);
app.use("/patient", createPatientRoute);
app.use("/doctor", createDoctorRoute);
app.use("/appointment", createAppointmentRoute);

app.get("/", (req: Request, res: Response) => {
  res.send(req.originalUrl);
});


app.listen(port, async () => {
  try {
    startSequelize(db_name, db_password, db_host, db_username);
    console.log("Up and running!!!");
  } catch (error) {
    console.error(error);
    process.abort();
  }
});