import { Router, Request, Response } from "express";
import { createUser} from "../firebase/methods";
// import { hasRole } from "../middlewares/hasRole";
// import { isAuthenticated } from "../middlewares/isAuthenticated";
export const createUserRoute = Router();

createUserRoute.post('/createUser', async (req: Request, res: Response) => {
  const {displayName, email, password, role} = req.body;

  if (!displayName || !email || !password || !role) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }
  if (role !== "patient") {
    res.status(400);
    return res.send({ error: "Invalid role" });
  }

  try {
     const userCreated = await createUser(displayName, email, password, role);
     res.statusCode = 201;
     res.send({userCreated});
  } catch (error) {
    res.status(500).send(error);
  }
})