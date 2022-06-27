//logica
import { Doctor } from "../models/Doctor.model";
import { Profile } from "../models/Profile.model";

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

  export const getProfileDoctor = async (id: number) => {
    try {
      const getProfileDoctor = await Doctor.findOne({
        where: {ProfileId: id},
        include: [{
          model: Profile,
          required: true
        }]
      });
      return getProfileDoctor;
    } catch (error) {
      throw error
    }
  };