//logica
import { Patient } from "../models/Patient.model";

export const patientProfile = async (
  gender: string,
  birthDate: Date,
  age: number,
  ProfileId: number) =>{
    try {
      const patientProfile = await Patient.create({gender, birthDate, age, ProfileId});
      return patientProfile;
    } catch (error) {
      throw error;
    }
  };