import { useForm } from 'react-hook-form'
import {createUser, User} from '../slices/signUpSlice'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { useNavigate } from 'react-router-dom'
import { createProfile, selectProfileDetails} from '../slices/profileSlice'
import { selectUID } from '../slices/authSlice'

export const Profile = () => {
  type Profile = {
    uid: string,
    firstName:string,
    lastName:string,
    address:string,
    phoneNumber:string
  }
  const {register, handleSubmit, formState: { errors }} = useForm <Profile>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const uid = useAppSelector(selectUID);
  const profileCreate = async (values: Partial<Profile>) => {
    values.uid = uid;
    try{
      dispatch(createProfile(values));
      navigate("/dashboard");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
        <div className="signup-container">
        <form className="Signup-form" onSubmit={handleSubmit(profileCreate)}>
          <p className="title">Create Profile</p>
          
          <label>
          First Name:
            <input id="firstName" type={"firstName"} {...register("firstName",{ required: true })} />
          </label>
          <label>
          Last Name:
            <input id="lastName" type={"lastName"} {...register("lastName",{ required: true })} />
          </label>
          <label>
          Address:
            <input id="address" type={"address"} {...register("address",{ required: true })} />
          </label>
          <label>
          phoneNumber:
            <input id="phoneNumber" type={"phoneNumber"} {...register("phoneNumber",{ required: true })} />
          </label>
          <input className="submit" type={"submit"} value="Create" />
        </form>
      </div>
    </>
  )
}

export default Profile