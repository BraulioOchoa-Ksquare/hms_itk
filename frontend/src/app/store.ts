import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appointmentsReducer from '../components/slices/appointmentsSlice';
import authReducer from '../components/slices/authSlice'
import doctorReducer from '../components/slices/doctorSlice';
import patientsReducer from '../components/slices/patientsSlice';
import profileReducer from '../components/slices/profileSlice';
import singUpReducer from '../components/slices/signUpSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signUp: singUpReducer,
    appointment: appointmentsReducer,
    profile: profileReducer,
    patient: patientsReducer,
    doctor: doctorReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;