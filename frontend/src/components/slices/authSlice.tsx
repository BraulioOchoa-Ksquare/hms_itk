import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IAuth {
    uid: string;
    access_token: string;
    email: string;
    role: string | null;
}

export interface AuthState{
    auths: IAuth[];
    status: "idle" | "loading" | "completed" | "failed";
    authDetails: IAuth | null;
}


const initialState: AuthState = {
    auths: [],
    status: "idle",
    authDetails: null
}

export const loginSuccess = createAsyncThunk("login/user", 
    async(body:{
        uid: string;
        access_token: string;
        email: string;
        role: string;
    },
    thunkApi) =>{
        const state = thunkApi.getState() as RootState;
        return body
    });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearStateAuth: (state) =>{
            state.authDetails = null;
            state.auths = [];
            state.status = "idle";
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loginSuccess.fulfilled, (state, action)=>{
           state.authDetails = action.payload;
           state.status = "completed";
        });
    }
})

export const selectUID = (state: RootState) => state.auth.authDetails?.uid;
export const selectAccessToken = (state: RootState) =>  state.auth.authDetails?.access_token;
export const selectEmail = (state: RootState) => state.auth.authDetails?.email;
export const selectRole = (state: RootState) => state.auth.authDetails?.role;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const {clearStateAuth} = authSlice.actions;
export default authSlice.reducer