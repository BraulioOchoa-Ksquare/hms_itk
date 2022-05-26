//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { createDoctor } from "../handlers/doctor.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Appointment } from "../models/Appointment.models";

export const DoctorRoute = Router();

DoctorRoute.post(
  '/createDoctor',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {professionalLicense, speciality, ProfileId} = req.body;

  if (!professionalLicense || !speciality) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }

  try {
    const doctorCreated = await createDoctor(professionalLicense, speciality, ProfileId);
     res.statusCode = 201;
     res.send({doctorCreated});
  } catch (error) {
    res.status(500).send(error);
  }
});

DoctorRoute.get(
  '/searchDoctorApp/:order?',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
    try {
      const {date, PatientId,} = JSON.parse(req.query.where as string || "{}")
      const where = {date,PatientId};
      (Object.keys(where) as (keyof typeof where)[]).forEach((key) => {
        where[key] === undefined ? delete where[key] : {}
      });

      let {order} = req.params;
      if(order !== "ASC" && order !== "DESC"){
        order = "ASC";
      }
      const searchDoctorApp = await Appointment.findAll({
        where,
        order: [["id", order]]
      });
      res.statusCode = 201;
      res.send({searchDoctorApp});
  } catch (error) {
  console.log(error);
  }
});

