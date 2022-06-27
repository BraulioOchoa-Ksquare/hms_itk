import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { useNavigate } from 'react-router-dom'
import {selectProfileId} from '../slices/profileSlice'
import { patientProfile } from '../slices/patientsSlice'

export const Patient = () => {
  type Patient = {
    gender: string,
    birthDate: string,
    age: number,
    ProfileId: number
  }
  const {register, handleSubmit, formState: { errors }} = useForm <Patient>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileId = useAppSelector(selectProfileId);
  const profilePatient = async (values: Partial<Patient>) => {
    values.ProfileId = profileId;
    try{
      dispatch(patientProfile(values));
      navigate("/dashboard");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
        <div className="signup-container">
        <form className="Signup-form" onSubmit={handleSubmit(profilePatient)}>
          <p className="title">Complete Profile Patient</p>
          <label>
          Gender:
            <input id="gender" type={"gender"} {...register("gender",{ required: true })} />
          </label>
          <label>
          Brith Date:
            <input id="birthDate" type={"Date"} {...register("birthDate",{ required: true })} />
          </label>
          <label>
          Age:
            <input id="age" type={"age"} {...register("age",{ required: true })} />
          </label>
          <input className="submit" type={"submit"} value="Create" />
        </form>
      </div>
    </>
  )
}

export default Patient