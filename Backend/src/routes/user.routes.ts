import { Router, Request, Response } from "express";
import { createUser, deleteUser, disableUser, getAllUsers, userUid} from "../firebase/methods";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
export const UserRoute = Router();

UserRoute.post('/',

async (req: Request, res: Response) => {
  const {displayName, email, password} = req.body;

  if (!displayName || !email || !password) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }

  try {
     const userCreated = await createUser(displayName, email, password, "patient");
     res.statusCode = 201;
     res.send({userCreated});
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
})

UserRoute.get(
  '/list',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    try {
       const usersListed = await getAllUsers();
       res.statusCode = 201;
       res.send({usersListed});
    } catch (error) {
      res.status(500).send({error:"something went wrong"});
    }
  })

UserRoute.get(
  '/:uid',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    const {uid} = req.params;
    try {
       const userPerUid = await userUid(uid);
       res.statusCode = 201;
       res.send({userPerUid});
    } catch (error) {
      res.status(500).send({error:"something went wrong"});
    }
  })

UserRoute.delete(
    '/:uid',
    isAuthenticated,
    hasRole({
      roles: ["admin"],
      allowSameUser: false,
    }),
    async (req: Request, res: Response) => {
      const {uid} = req.params;
      try {
         await deleteUser(uid);
         res.statusCode = 201;
         res.send(`User with the id: ${uid}, was deleted successfully`);
      } catch (error) {
        res.status(500).send({error:"something went wrong"});
      }
    })

UserRoute.patch(
'/disable/:uid',
isAuthenticated,
hasRole({
  roles: ["admin"],
  allowSameUser: false,
}),
async (req: Request, res: Response) => {
  const {uid} = req.params;
  try {
     const userDisabled = await disableUser(uid, true);
     res.statusCode = 201;
     res.send({userDisabled});
  } catch (error) {
    res.status(500).send({error:"something went wrong"});
  }
})