import React from 'react'
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';

const baseURL: string = "http://localhost:5000";

export interface IProfile {
  id: number,
  uid: string,
  firstName:string,
  lastName:string,
  address:string,
  phoneNumber:string
}
 
export interface Profile{
  profile: IProfile[];
  status: "idle" | "loading" | "completed" | "failed";
  profileDetails: IProfile | null;
}

const initialState: Profile = {
  profile: [],
  status: "idle",
  profileDetails: null
}

export const createProfile = createAsyncThunk("/profile/:uid",
    async(body:Partial<IProfile>,thunkApi) =>{
        const state = thunkApi.getState() as RootState;
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.auth.authDetails?.access_token
        };
        const req = await axios({
          method: "POST",
          url: baseURL + "/profile/" + state.auth.authDetails?.uid,
          data: body,
          headers: headers
      })
      return req.data
    });

    export const getUsersProfile = createAsyncThunk("/profile/:id",
    async(_, thunkApi) =>{
      const state = thunkApi.getState() as RootState;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.auth.authDetails?.access_token
      };
        const getPatientProfile = await axios.get(baseURL + "/profile/" + state.auth.authDetails?.uid, {headers});
        return getPatientProfile.data
    });

    export const profileSlice = createSlice({
      name: 'profile',
      initialState,
      reducers: {
        clearStateProfile: (state) =>{
          state.profileDetails = null;
          state.profile = [];
          state.status = "idle";
      }
      },
      extraReducers: (builder)=>{
          builder.addCase(createProfile.fulfilled, (state, action)=>{
             state.profileDetails = action.payload;
             state.status = "completed";
          });
          builder.addCase(getUsersProfile.fulfilled, (state, action)=>{
            state.profileDetails = action.payload;
            state.status = "completed";
           });
      }
  })

  export const selectProfile = (state: RootState) => state.profile.profile;
  export const selectProfileStatus = (state : RootState) => state.profile.status;
  export const selectProfileDetails = (state: RootState) => state.profile.profileDetails;
  export const selectProfileId = (state: RootState) => state.profile.profileDetails?.id
  export const {clearStateProfile} = profileSlice.actions;
  export default profileSlice.reducer