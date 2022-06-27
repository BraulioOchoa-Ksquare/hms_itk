import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { IProfile } from "./profileSlice";
import { User } from "firebase/auth";

const baseURL: string = "http://localhost:5000";

export interface IDoctor {
  id: number;
  professionalLicense: string;
  speciality: string;
  ProfileId: number;
  Profile: IProfile;
}

export interface Doctor {
  doctors: IDoctor[];
  status: "idle" | "loading" | "completed" | "failed";
  doctorsDetails: IDoctor | null;
}

const initialState: Doctor = {
  doctors: [],
  status: "idle",
  doctorsDetails: null,
};

export const doctorProfile = createAsyncThunk(
  "/doctor/profile-form",
  async (body: Partial<IDoctor>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const req = await axios({
      method: "POST",
      url: baseURL + "/doctor/profile/" + state.auth.authDetails?.uid,
      data: body,
      headers: headers,
    });
    return req.data;
  }
);

export const getProfileDoctor = createAsyncThunk(
  "/doctor/profile/:id/:uid",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const getProfileDoctor = await axios.get(
      baseURL + "/doctor/profile/" + state.profile.profileDetails?.id + "/" + state.auth.authDetails?.uid,
      { headers }
    );
    return getProfileDoctor.data;
  }
);
 
export const getDoctorsList = createAsyncThunk(
  "/admin/doctors",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const getDoctorsList = await axios.get(
      baseURL + "/admin/doctors",
      { headers }
    );
    return getDoctorsList.data;
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    clearStateDoctor: (state) =>{
      state.doctorsDetails = null;
      state.doctors  = [];
      state.status = "idle";
  }
  },
  extraReducers: (builder) => {
    builder.addCase(doctorProfile.fulfilled, (state, action) => {
      state.doctorsDetails = action.payload;
      state.status = "completed";
      state.doctors = action.payload;
    });

    builder.addCase(getProfileDoctor.fulfilled, (state, action) => {
      state.doctorsDetails = action.payload;
      state.status = "completed";
      state.doctors = action.payload;
    });
    builder.addCase(getDoctorsList.fulfilled, (state, action) => {
      state.status = "completed";
      state.doctors = action.payload;
    });
  },
});

export const selectDoctor = (state: RootState) => state.doctor.doctors;
export const selectDoctorStatus = (state: RootState) => state.doctor.status;
export const selectDoctorProfileDetails = (state: RootState) => state.doctor.doctorsDetails;
export const selectProfileDoctorId = (state: RootState) => state.doctor.doctorsDetails?.ProfileId
export const selectDoctorId = (state: RootState) => state.doctor.doctorsDetails?.id
export const {clearStateDoctor} = doctorSlice.actions;
export default doctorSlice.reducer;
