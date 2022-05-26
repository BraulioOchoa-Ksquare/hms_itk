import { Router, Request, Response } from "express";
import { createUser} from "../firebase/methods";
import {appointmentListAll, disableUser } from "../handlers/admin.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Appointment } from "../models/Appointment.models";
export const AdminRoute = Router();


AdminRoute.post('/createAdmin',
isAuthenticated,
hasRole({
  roles: [""],
  allowSameUser: false,
}),
async (req: Request, res: Response) => {
  const {displayName, email, password, role} = req.body;

  if (!displayName || !email || !password || !role) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }
  
  if (role !== "admin") {
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
});

AdminRoute.post('/createUserDoctor', async (req: Request, res: Response) => {
  const {displayName, email, password, role} = req.body;

  if (!displayName || !email || !password || !role) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }
  
  if (role !== "doctor") {
    res.status(400);
    return res.send({ error: "Invalid role" });
  }

  try {
     const userDoctorCreated = await createUser(displayName, email, password, role);
     res.statusCode = 201;
     res.send({userDoctorCreated});
  } catch (error) {
    res.status(500).send(error);
  }
})

AdminRoute.patch(
  '/activateUser/:uid',
  isAuthenticated,
  hasRole({
    roles: ["admin"],
    allowSameUser: true,
  }), // Solamente el SU pueda acceder
  async (req: Request, res: Response) => {
    const {uid} = req.params;
    try {
       const userActivated = await disableUser(uid, false);
       res.statusCode = 201;
       res.send({userActivated});
    } catch (error) {
      res.status(500).send(error);
    }
  });

  AdminRoute.get(
    '/appointmentListAll/',
    isAuthenticated,
    hasRole({
      roles: ["admin"],
      allowSameUser: true,
    }), // Solamente el SU pueda acceder
    async (req: Request, res: Response) => {
      const { limit, offset} = req.query
      try {
         const appointmentsListed = await appointmentListAll( limit? +limit: 10, offset? +offset: 0);
         res.statusCode = 201;
         res.send({appointmentsListed});
      } catch (error) {
        res.status(500).send(error);
      }
    });

    //Filter by PatientId, DoctorId, status and order by ASC and DESC
    AdminRoute.get(
      '/searchAdminApp/:order?',
      isAuthenticated,
      hasRole({
        roles: ["admin"],
        allowSameUser: false,
      }), // Solamente el SU pueda acceder
      async (req: Request, res: Response) => {
        try {
          const {PatientId, DoctorId, status} = JSON.parse(req.query.where as string || "{}")
          const where = {PatientId,DoctorId,status};
          (Object.keys(where) as (keyof typeof where)[]).forEach((key) => {
            where[key] === undefined ? delete where[key] : {}
          });

          let {order} = req.params;
          if(order !== "ASC" && order !== "DESC"){
            order = "ASC";
          }
          const searchAdminApp = await Appointment.findAll({
            where,
            order: [["id", order]]
          });
          res.statusCode = 201;
          res.send({searchAdminApp});
      } catch (error) {
      console.log(error);
      }
    });