//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { createAppointment } from "../handlers/appointment.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const createAppointmentRoute = Router();

createAppointmentRoute.post(
  '/createAppointment',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {date, hour, DoctorId, PatientId, status} = req.body;

  if (!date || !hour || !DoctorId || !PatientId || !status) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }

  try {
    const appointmentCreated = await createAppointment(date, hour, DoctorId, PatientId, status);
     res.statusCode = 201;
     res.send({appointmentCreated});
  } catch (error) {
    res.status(500).send(error);
  }
});
