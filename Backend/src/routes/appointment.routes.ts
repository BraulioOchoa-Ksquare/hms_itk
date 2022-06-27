//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { appointmentDisabledPatient, appointmentListDoctor, appointmentListPatient, appointmentReadPatient, createAppointment, updateDateHourApp } from "../handlers/appointment.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const AppointmentRoute = Router();

//========================= PATIENTS ==================================
AppointmentRoute.post(
  '/:userId',
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
     res.send(appointmentCreated);
  } catch (error) {
    console.log(error);
    res.status(500).send({error:"something went wrong"});
  }
});

AppointmentRoute.get(
  '/list/:id/:userId',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;
  const {limit, offset} = req.query
  try {
    const appointmentList = await appointmentListPatient(+id, limit? +limit: 10, offset? +offset: 0);
     res.statusCode = 201;
     res.send(appointmentList);
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
});

AppointmentRoute.get(
  '/patient/:id/:userId',
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
     res.send(appointmentRead);
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
});

AppointmentRoute.patch(
  '/cancel/:id',
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
    res.status(500).send({error:"something went wrong"});
  }
});
//========================= END PATIENTS ==================================

//========================= DOCTOR ==================================
AppointmentRoute.get(
  '/list/:id/:userId',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;
  const { limit, offset} = req.query
  try {
    const appointmentList = await appointmentListDoctor(+id, limit ? +limit: 10, offset ? +offset: 0);
     res.statusCode = 201;
     res.send(appointmentList);
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
});

AppointmentRoute.patch(
  '/update/:id',
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
    res.status(500).send({error:"something went wrong"});
  }
});

//========================= END DOCTOR ==================================

