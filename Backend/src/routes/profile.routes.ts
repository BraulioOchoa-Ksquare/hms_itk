//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { createProfile } from "../handlers/profile.handlers";
export const ProfileRoute = Router();

ProfileRoute.post('/createProfile', async (req: Request, res: Response) => {
  const {uid, id, firstName, lastName, address, phoneNumber} = req.body;

  if (!uid || !firstName || !lastName || !address || !phoneNumber) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }

  try {
    const profileCreated = await createProfile(uid, id, firstName, lastName, address, phoneNumber);
     res.statusCode = 201;
     res.send({profileCreated});
  } catch (error) {
    res.status(500).send(error);
  }
});