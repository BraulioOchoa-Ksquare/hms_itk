import express, { Request, Response } from "express";
import { startSequelize } from "./models/index";
import dotenv from "dotenv";
import * as admin from "firebase-admin";
import { UserRoute } from "./routes/user.routes";
import { ProfileRoute } from "./routes/profile.routes";
import { PatientRoute } from "./routes/patient.routes";
import { DoctorRoute } from "./routes/doctor.routes";
import { AppointmentRoute } from "./routes/appointment.routes";
import { AdminRoute } from "./routes/admin.routes";

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
app.use("/user", UserRoute);
app.use("/profile", ProfileRoute);
app.use("/patient", PatientRoute);
app.use("/doctor", DoctorRoute);
app.use("/appointment", AppointmentRoute);
app.use("/admin", AdminRoute);

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