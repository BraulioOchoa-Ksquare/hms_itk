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
      console.log("Profile created successfully");
      return profileCreated;
    } catch (error) {
      console.log(error);
    }
  };