//logica
import { Appointment } from "../models/Appointment.models";

//========================= PATIENTS ==================================
export const createAppointment = async (
  date: string,
  hour: string,
  DoctorId: number,
  PatientId: number,
  status: boolean
) => {
  try {
    const appointmentCreated = await Appointment.create({
      date,
      hour,
      DoctorId,
      PatientId,
      status,
    });
    return appointmentCreated;
  } catch (error) {
    throw error;
  }
};

export const appointmentListPatient = async (
  id: number,
  limit?: number,
  offset?: number
) => {
  try {
    const appointmentList = await Appointment.findAll({
      where: { PatientId: id },
      limit: limit,
      offset: offset,
    });
    return appointmentList;
  } catch (error) {
    throw error;
  }
};

export const appointmentReadPatient = async (id: number) => {
  try {
    const appointmentRead = await Appointment.findByPk(id);
    return appointmentRead;
  } catch (error) {
    throw error;
  }
};

export const appointmentDisabledPatient = async (
  id: number,
  status: boolean
) => {
  try {
    const appointmentDisabled = await Appointment.update(
      { status: status },
      { where: { id: id } }
    );
    return appointmentDisabled;
  } catch (error) {
    throw error;
  }
};
//============================ END PATIENTS ==================================

//============================ DOCTORS ==================================
export const appointmentListDoctor = async (
  id: number,
  limit?: number,
  offset?: number
) => {
  try {
    const appointmentList = await Appointment.findAll({
      where: { DoctorId: id },
      limit: limit,
      offset: offset,
    });
    return appointmentList;
  } catch (error) {
    throw error;
  }
};

export const updateDateHourApp = async (
  id: number,
  date?: string,
  hour?: string
) => {
  try {
    const appointmentUpdated = await Appointment.update(
      { date: date, hour: hour },
      { where: { id: id } }
    );
    console.log("The date and the hour were updated successfully");
    return appointmentUpdated;
  } catch (error) {
    throw error;
  }
};
