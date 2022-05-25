//logica
import { Doctor } from "../models/Doctor.model";

export const createDoctor = async (
  professionalLicense: string,
  speciality: string,
  ProfileId: number) =>{
    try {
      const profileDoctor = await Doctor.create({professionalLicense, speciality, ProfileId});
      console.log("Doctor created successfully");
      return profileDoctor;
    } catch (error) {
      console.log(error);
    }
  };