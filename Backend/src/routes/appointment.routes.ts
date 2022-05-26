//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { appointmentDisabledPatient, appointmentListDoctor, appointmentListPatient, appointmentReadPatient, createAppointment, updateDateHourApp } from "../handlers/appointment.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const AppointmentRoute = Router();

//========================= PATIENTS ==================================
AppointmentRoute.post(
  '/createAppointment',
  isAuthenticated,
  hasRole({
    roles: [""],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {date, hour, DoctorId, PatientId} = req.body;

  if (!date || !hour || !DoctorId || !PatientId) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }

  try {
    const appointmentCreated = await createAppointment(date, hour, DoctorId, PatientId, true);
     res.statusCode = 201;
     res.send({appointmentCreated});
  } catch (error) {
    res.status(500).send(error);
  }
});

AppointmentRoute.get(
  '/appointmentListPatient/:id',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const appointmentList = await appointmentListPatient(+id);
     res.statusCode = 201;
     res.send({appointmentList});
  } catch (error) {
    res.status(500).send(error);
  }
});

AppointmentRoute.get(
  '/appointmentReadPatient/:id',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const appointmentRead = await appointmentReadPatient(+id);
     res.statusCode = 201;
     res.send({appointmentRead});
  } catch (error) {
    res.status(500).send(error);
  }
});

AppointmentRoute.patch(
  '/appointmentDisabledPatient/:id',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;
  const status = false;
  try {
    await appointmentDisabledPatient(+id, status);
     res.statusCode = 201;
     res.send(`The appointment with the id: ${id} has been cancelled.`);
  } catch (error) {
    res.status(500).send(error);
  }
});
//========================= END PATIENTS ==================================

//========================= DOCTOR ==================================
AppointmentRoute.get(
  '/appointmentListDoctor/:id',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const appointmentList = await appointmentListDoctor(+id);
     res.statusCode = 201;
     res.send({appointmentList});
  } catch (error) {
    res.status(500).send(error);
  }
});

AppointmentRoute.patch(
  '/updateDateHourApp/:id',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;
  const {date, hour} = req.body;
  try {
     await updateDateHourApp(+id, date, hour);
     res.statusCode = 201;
     res.send(`The appointment with the id: ${id} has been updated.`);
  } catch (error) {
    res.status(500).send(error);
  }
});

//========================= END DOCTOR ==================================

