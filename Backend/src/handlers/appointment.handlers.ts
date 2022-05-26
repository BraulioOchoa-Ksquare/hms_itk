//logica
import { Appointment } from "../models/Appointment.models";


//========================= PATIENTS ==================================
export const createAppointment = async (
date: string,
hour: string,
DoctorId: number,
PatientId: number,
status: boolean) =>{
    try {
      const appointmentCreated = await Appointment.create({date, hour, DoctorId, PatientId, status});
      console.log("Appointment created successfully");
      return appointmentCreated;
    } catch (error) {
      console.log(error);
    }
  };

  export const appointmentListPatient = async (
    id: number, 
    limit?: number,
    offset?: number
    ) =>{
        try {
          const appointmentList = await Appointment.findAll({where: {PatientId: id}, limit: limit, offset: offset});
          console.log("Appontment list");
          return appointmentList;
        } catch (error) {
          console.log(error);
        }
      };

      export const appointmentReadPatient = async (id: number) =>{
        try {
          const appointmentRead = await Appointment.findByPk(id);
          console.log("Appontment created successfully");
          return appointmentRead;
        } catch (error) {
          console.log(error);
        }
      };

      export const appointmentDisabledPatient = async ( id: number, status: boolean) =>{
        try {
          const appointmentDisabled = await Appointment.update(
            {status: status},
            {where: {id: id}}
            );
          console.log("Appontment was disables correctly");
          return appointmentDisabled;
        } catch (error) {
          console.log(error);
        }
      };
//============================ END PATIENTS ==================================

//============================ DOCTORS ==================================
export const appointmentListDoctor = async (
  id: number,
  limit?: number,
  offset?: number
  ) =>{
  try {
    const appointmentList = await Appointment.findAll({where: {DoctorId: id}, limit: limit, offset: offset});
    console.log("Appointment list");
    return appointmentList;
  } catch (error) {
    console.log(error);
  }
};

export const updateDateHourApp = async ( id: number, date?:string, hour?:string) =>{
  try {
    const appointmentUpdated = await Appointment.update(
      {date: date, hour: hour},
      {where: {id: id}}
      );
    console.log("The date and the hour were updated successfully");
    return appointmentUpdated;
  } catch (error) {
    console.log(error);
  }
};

