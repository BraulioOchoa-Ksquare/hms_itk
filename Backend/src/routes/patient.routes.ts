//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { getProfilePatient, patientProfile } from "../handlers/patient.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const PatientRoute = Router();

PatientRoute.post(
  '/profile/:userId',
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
    const profileCreated = await patientProfile(gender, birthDate, age, ProfileId);
     res.statusCode = 201;
     res.send(profileCreated);
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
});

PatientRoute.get(
  '/profile/:id/:userId/',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;
    try {
       const patientProfile = await getProfilePatient(+id);
       res.statusCode = 200;
       res.send(patientProfile);
    } catch (error) {
      res.status(500).send({error:"something went wrong"});
    }
  });




