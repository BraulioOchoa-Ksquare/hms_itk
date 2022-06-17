//logica
import { Doctor } from "../models/Doctor.model";

export const profileDoctor = async (
  professionalLicense: string,
  speciality: string,
  ProfileId: number) =>{
    try {
      const profileDoctor = await Doctor.create({professionalLicense, speciality, ProfileId});
      return profileDoctor;
    } catch (error) {
      throw error;
    }
  };