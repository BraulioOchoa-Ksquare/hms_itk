//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { profileDoctor } from "../handlers/doctor.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Appointment } from "../models/Appointment.models";

export const DoctorRoute = Router();

DoctorRoute.post(
  '/profile',
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
    const profileCreated = await profileDoctor(professionalLicense, speciality, ProfileId);
     res.statusCode = 201;
     res.send({profileCreated});
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
});

DoctorRoute.get(
  '/search/:DoctorId',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
    try {
      const {DoctorId} = req.params;
      const {date, PatientId} = JSON.parse(req.query.where as string || "{}")
      const where = {date,PatientId, DoctorId};
      (Object.keys(where) as (keyof typeof where)[]).forEach((key) => {
        where[key] === undefined ? delete where[key] : {}
      });
      const order = req.query
      let orderString: string = "ASC";
      orderString = String(order.order);
        orderString = orderString.slice(1,-1);
      if(orderString !== "DESC"){
        orderString = "ASC"
      }
      const searchDoctorApp = await Appointment.findAll({
        where,
        order: [["id", orderString]]
      });
      res.statusCode = 201;
      res.send({searchDoctorApp});
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
});

