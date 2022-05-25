//logica
import { Appointment } from "../models/Appointment.models";

export const createAppointment = async (
date: string,
hour: string,
DoctorId: number,
PatientId: number,
status: boolean) =>{
    try {
      const profileDoctor = await Appointment.create({date, hour, DoctorId, PatientId, status});
      console.log("Appontment created successfully");
      return profileDoctor;
    } catch (error) {
      console.log(error);
    }
  };