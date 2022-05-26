import { Router, Request, Response } from "express";
import { createUser} from "../firebase/methods";
import { adminAppointmentListDoctor, adminAppointmentListPatient, appointmentListAll, disableUser } from "../handlers/admin.handlers";
import { hasRole } from "../middlewares/hasRole";
import { isAuthenticated } from "../middlewares/isAuthenticated";
export const AdminRoute = Router();

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
    '/appointmentListAll',
    isAuthenticated,
    hasRole({
      roles: ["admin"],
      allowSameUser: true,
    }), // Solamente el SU pueda acceder
    async (req: Request, res: Response) => {
      try {
         const appointmentsListed = await appointmentListAll();
         res.statusCode = 201;
         res.send({appointmentsListed});
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
        let ofset = req.query.page;
        let limit = req.query.limit
        try {
           const appointmentsListed = await appointmentListAll();
           res.statusCode = 201;
           res.send({appointmentsListed});
        } catch (error) {
          res.status(500).send(error);
        }
      });

   AdminRoute.get(
      '/adminAppointmentListDoctor/:DoctorId',
      isAuthenticated,
      hasRole({
        roles: ["admin"],
        allowSameUser: true,
      }), // Solamente el SU pueda acceder
      async (req: Request, res: Response) => {
      const {DoctorId} = req.params;
      try {
        const adminAppointmentList = await adminAppointmentListDoctor(+DoctorId);
         res.statusCode = 201;
         res.send({adminAppointmentList});
      } catch (error) {
        res.status(500).send(error);
      }
    });