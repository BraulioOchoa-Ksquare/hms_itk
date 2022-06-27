import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

const baseURL: string = "http://localhost:5000";

export interface IAppointment {
  id: number;
  date: Date;
  hour: string;
  DoctorId: number;
  PatientId: number;
  status: boolean;
}

export interface Appointment {
  appointments: IAppointment[];
  status: "idle" | "loading" | "completed" | "failed";
  appointmentDetails: IAppointment | null;
}

const initialState: Appointment = {
  appointments: [],
  status: "idle",
  appointmentDetails: null,
};

export const createAppointment = createAsyncThunk(
  "/appointment/:userId",
  async (body: Partial<IAppointment>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const req = await axios({
      method: "POST",
      url: baseURL + "/appointment/" + state.auth.authDetails?.uid,
      data: (body = {
        date: body.date,
        hour: body.hour,
        PatientId: state.patient.patientsDetails?.id,
        DoctorId: Number(body.DoctorId),
      }),
      headers: headers,
    });
    return req.data;
  }
);

export const getListAppointment = createAsyncThunk(
  "appointment/list",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const appointmentsList = await axios.get(
      baseURL + "/admin/appointmentList",
      { headers }
    );
    return appointmentsList.data;
  }
);

export const getPatientAppointment = createAsyncThunk(
  "/appointment/patient/:id",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const getPatientAppointment = await axios.get(
      baseURL +
        "/appointment/list/" +
        state.patient.patientsDetails?.id +
        "/" +
        state.auth.authDetails?.uid,
      { headers }
    );
    return getPatientAppointment.data;
  }
);

export const doctorAppointments = createAsyncThunk(
  "/appointment/list/:id/:userId",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.authDetails?.access_token,
    };
    const doctorAppointments = await axios.get(
      baseURL +
        "/appointment/list/" +
        state.doctor.doctorsDetails?.id +
        "/" +
        state.auth.authDetails?.uid,
      { headers }
    );
    return doctorAppointments.data;
  }
);

export const appointmentsSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearStateAppointment: (state) =>{
      state.appointmentDetails= null;
      state.appointments = [];
      state.status = "idle";
  }
  },
  extraReducers: (builder) => {
    builder.addCase(getListAppointment.fulfilled, (state, action) => {
      state.appointments = action.payload;
      state.status = "completed";
    });
    builder.addCase(getPatientAppointment.fulfilled, (state, action) => {
      state.appointments = action.payload;
      state.status = "completed";
    });
    builder.addCase(doctorAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload;
      state.status = "completed";
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.appointmentDetails = action.payload;
      state.status = "completed";
    });
  },
});

export const selectAppointment = (state: RootState) =>
  state.appointment.appointments;
export const selectAppointmentsStatus = (state: RootState) =>
  state.appointment.status;
  export const {clearStateAppointment} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
