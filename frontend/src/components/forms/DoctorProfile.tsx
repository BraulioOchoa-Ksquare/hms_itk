import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { useNavigate } from 'react-router-dom'
import {selectProfileId} from '../slices/profileSlice'
import { doctorProfile } from '../slices/doctorSlice'

export const Doctor = () => {
  type Doctor = {
    professionalLicense: string,
    speciality: string,
    ProfileId: number
  }
  const {register, handleSubmit, formState: { errors }} = useForm <Doctor>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileId = useAppSelector(selectProfileId);
  const profileDoctor = async (values: Partial<Doctor>) => {
    values.ProfileId = profileId;
    try{
      dispatch(doctorProfile(values));
      navigate("/dashboard");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
        <div className="signup-container">
        <form className="Signup-form" onSubmit={handleSubmit(profileDoctor)}>
          <p className="title">Complete Profile Doctor</p>
          <label>
          Professional License:
            <input id="professionalLicense" type={"professionalLicense"} {...register("professionalLicense",{ required: true })} />
          </label>
          <label>
          Speciality:
            <input id="speciality" type={"speciality"} {...register("speciality",{ required: true })} />
          </label>
          <input className="submit" type={"submit"} value="Create" />
        </form>
      </div>
    </>
  )
}

export default Doctor