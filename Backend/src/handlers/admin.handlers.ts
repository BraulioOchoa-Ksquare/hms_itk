import * as admin from "firebase-admin";
import { Appointment } from "../models/Appointment.models";
import { Doctor } from "../models/Doctor.model";
import { Patient } from "../models/Patient.model";
import { Profile } from "../models/Profile.model";
import { Role } from "../roles";

export const createUserDoctor = async (displayName: string, email: string, password: string, role: Role) => {
  const { uid } = await admin.auth().createUser({
    displayName: displayName,
    email: email,
    password: password
  });
  await admin.auth().setCustomUserClaims(
    uid, {
      role
    }
  );
    return uid;
  }

  const mapToUser = (user: admin.auth.UserRecord) => {
    const customClaims = (user.customClaims || { role: "" }) as { role?: string };
    const role = customClaims.role ? customClaims.role : "";

    return {
      uid: user.uid,
      email: user.email,
      role,
      isInactive: user.disabled,
    };
  };

  export const disableUser = async (uid: string, disabled: boolean) => {
    const user = await admin.auth().updateUser(uid, { disabled });
    return mapToUser(user);
  };

  export const getListPatients = async () => {
    try {
      const getListPatients = await Patient.findAll({
        include: [{
          model: Profile,
          required: true
        }]
      });
      return getListPatients;
    } catch (error) {
      throw error
    }
  }

  export const getListDoctors = async () => {
    try {
      const getListDoctors = await Doctor.findAll({
        include: [{
          model: Profile,
          required: true
        }]
      });
      return getListDoctors;
    } catch (error) {
      throw error
    }
  }

  export const appointmentListAll = async (
    limit?: number,
    offset?: number
  ) =>{
    try {
      const appointmentsListed = await Appointment.findAll(
        {order: ["id"], limit: limit, offset: offset}
      );
      return appointmentsListed;
    } catch (error) {
     throw error;
    }
  };


