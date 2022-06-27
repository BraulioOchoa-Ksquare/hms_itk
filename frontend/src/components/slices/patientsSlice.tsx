import React, { useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { IProfile } from "./profileSlice";

const baseURL: string = "http://localhost:5000";

export interface IPatient {
  id: number;
  gender: string;
  birthDate: string;
  age: number;
  ProfileId: number;
  Profile: IProfile;
}

export interface Patient {
  patients: IPatient[];
  status: "idle" | "loading" | "completed" | "failed";
  patientsDetails: IPatient | null;
}

const initialState: Patient = {
  patients: [],
  status: "idle",
  patientsDetails: null,
};

export const patientProfile = createAsyncThunk(
  "/patient/profile-form",
  async (body: Partial<IPatient>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const req = await axios({
      method: "POST",
      url: baseURL + "/patient/profile/" + state.auth.authDetails?.uid,
      data: body,
      headers: headers,
    });
    return req.data;
  }
);

export const getProfilePatient = createAsyncThunk(
  "/patient/profile/:id/:uid",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const getProfilePatient = await axios.get(
      baseURL +
        "/patient/profile/" +
        state.profile.profileDetails?.id +
        "/" +
        state.auth.authDetails?.uid,
      { headers }
    );
    return getProfilePatient.data;
  }
);

export const profileList = createAsyncThunk(
  "/profile/list",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const profileList = await axios.get(baseURL + "/admin/patients", {
      headers,
    });
    return profileList.data;
  }
);

export const patientsSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearStatePatient: (state) =>{
      state.patientsDetails = null;
      state.patients  = [];
      state.status = "idle";
  }
  },
  extraReducers: (builder) => {
    builder.addCase(patientProfile.fulfilled, (state, action) => {
      state.patientsDetails = action.payload;
      state.status = "completed";
    });
    builder.addCase(getProfilePatient.fulfilled, (state, action) => {
      state.patientsDetails = action.payload;
      state.status = "completed";
      state.patients = action.payload;
    });
    builder.addCase(profileList.fulfilled, (state, action) => {
      state.patientsDetails = action.payload;
      state.status = "completed";
      state.patients = action.payload;
    });
  },
});

export const selectPatient = (state: RootState) => state.patient.patients;
export const selectPatientStatus = (state: RootState) => state.patient.status;
export const selectPatientProfileDetails = (state: RootState) =>
  state.patient.patientsDetails;
export const selectProfilePatientId = (state: RootState) =>
  state.patient.patientsDetails?.ProfileId;
export const selectPatientId = (state: RootState) =>
  state.patient.patientsDetails?.id;

export const {clearStatePatient} = patientsSlice.actions;
export default patientsSlice.reducer;
