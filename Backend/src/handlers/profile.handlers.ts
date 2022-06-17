//logica 
import {Profile} from  "../models/Profile.model";

export const createProfile = async (
  uid:string, 
  id:number, 
  firstName:string, 
  lastName:string, 
  address:string, 
  phoneNumber:string) =>{
    try {
      const profileCreated = await Profile.create({uid, id, firstName, lastName, address, phoneNumber});
      return profileCreated;
    } catch (error) {
      throw error;
    }
  };

  export const profilePerId = async (id: number) => {
    try {
      const profileId = await Profile.findByPk(id);
      return profileId;
    } catch (error) {
      throw error;
    }
  };