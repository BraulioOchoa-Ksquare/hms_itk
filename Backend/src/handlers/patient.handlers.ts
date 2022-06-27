//logica
import { Patient } from "../models/Patient.model";
import { Profile } from "../models/Profile.model";

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

  export const getProfilePatient = async (id: number) => {
    try {
      const getProfilePatient = await Patient.findOne({
        where: {ProfileId: id},
        include: [{
          model: Profile,
          required: true
        }]
      });
      return getProfilePatient;
    } catch (error) {
      throw error
    }
  }