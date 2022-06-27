import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

const baseURL: string = "http://localhost:5000";

export interface User {
  displayName: string;
  email: string;
  password: string;
}

export interface userState {
  users: [];
  status: "idle" | "loading" | "completed" | "failed";
  userDetails: User | null;
}

const initialState: userState = {
  users: [],
  status: "idle",
  userDetails: null,
};

export const createUser = createAsyncThunk(
  "/signup/user",
  async (body: Partial<User>) => {
    const req = await axios({
      method: "POST",
      url: baseURL + "/user",
      data: body,
    });
    return req.data;
  }
);

export const createUserDoctor = createAsyncThunk(
  "/signup/userDoctor",
  async (body: Partial<User>) => {
    const req = await axios({
      method: "POST",
      url: baseURL + "/admin/userDoctor",
      data: body,
    });
    return req.data;
  }
);

export const SignUpSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearStateUser: (state) =>{
      state.userDetails = null;
      state.users = [];
      state.status = "idle";
  }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.status = "completed";
      state.users = action.payload;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(createUserDoctor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createUserDoctor.fulfilled, (state, action) => {
      state.status = "completed";
      state.users = action.payload;
    });
    builder.addCase(createUserDoctor.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectUser = (state: RootState) => state.signUp.users;
export const selectStatus = (state: RootState) => state.signUp.status;
export const selectDetails = (state: RootState) => state.signUp.userDetails;
export const {clearStateUser} = SignUpSlice.actions;
export default SignUpSlice.reducer;
