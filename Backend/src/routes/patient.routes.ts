//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { createPatient } from "../handlers/patient.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const PatientRoute = Router();

PatientRoute.post(
  '/createPatient',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {gender, birthDate, age, ProfileId} = req.body;

  if (!gender || !birthDate || !age) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }

  try {
    const patientCreated = await createPatient(gender, birthDate, age, ProfileId);
     res.statusCode = 201;
     res.send({patientCreated});
  } catch (error) {
    res.status(500).send(error);
  }
});


