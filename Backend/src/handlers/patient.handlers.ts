//logica
import { Patient } from "../models/Patient.model";

export const createPatient = async (
  gender: string,
  birthDate: Date,
  age: number,
  ProfileId: number) =>{
    try {
      const profilePatient = await Patient.create({gender, birthDate, age, ProfileId});
      console.log("Patient created successfully");
      return profilePatient;
    } catch (error) {
      console.log(error);
    }
  };