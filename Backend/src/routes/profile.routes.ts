//Esta ruta usa la logica de handlers
import { Router, Request, Response } from "express";
import { createProfile, profilePerId } from "../handlers/profile.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
export const ProfileRoute = Router();

ProfileRoute.post('/', async (req: Request, res: Response) => {
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
    res.status(500).send({error:"something went wrong"});
  }
});

ProfileRoute.get(
  '/:id',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: false,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const profileId = await profilePerId(+id);
     res.statusCode = 201;
     res.send({profileId});
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
});