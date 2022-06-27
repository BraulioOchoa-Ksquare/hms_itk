import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { selectPatientId } from "../slices/patientsSlice";
import {
  getDoctorsList,
  selectDoctor,
  selectDoctorId,
} from "../slices/doctorSlice";
import { createAppointment } from "../slices/appointmentsSlice";
import { useEffect } from "react";
import { selectAuthStatus } from "../slices/authSlice";
 
export const CreateAppointment = () => {
  type Appointment = {
    id: number;
    date: Date;
    hour: string;
    DoctorId: number;
    PatientId: number;
    status: boolean;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Appointment>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const doctorId = useAppSelector(selectDoctorId);
  const patientId = useAppSelector(selectPatientId);
  const loginStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (loginStatus === "completed") {
      dispatch(getDoctorsList());
    }
  }, [loginStatus, dispatch]);

  let listDoctor = useAppSelector(selectDoctor);

  const arrayDoctors = listDoctor.map((value) => {
  return (<option key={value.id} value={Number(value.id)}>
      {value.id}
      {value.Profile.firstName} {value.Profile.lastName}
    </option>)
  });

  const createApp = async (values: Partial<Appointment>) => {
    // values.DoctorId = doctorId;
    // values.PatientId = patientId;
    try {
      dispatch(createAppointment(values));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="signup-container">
        <form className="Signup-form" onSubmit={handleSubmit(createApp)}>
          <p className="title">Complete Profile Patient</p>
          <label>
            Date:
            <input
              id="date"
              type={"Date"}
              {...register("date", { required: true })}
            />
          </label>
          <label>
            Hour:
            <input
              id="hour"
              type={"time"}
              {...register("hour", { required: true })}
            />
          </label>
          <br />
          <select {...register("DoctorId")}>
            {arrayDoctors}
          </select>
          <br />
          <input className="submit" type={"submit"} value="Create" />
        </form>
      </div>
    </>
  );
};

export default CreateAppointment;
