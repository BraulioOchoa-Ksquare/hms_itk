import { useForm } from 'react-hook-form'
import {createUser, User} from '../slices/signUpSlice'
import { useAppDispatch } from '../../app/hook'
import { useNavigate } from 'react-router-dom'
import usersImg from "./../../images/doctors-icon.png";



export const SignUpDoctor = () => {
  type SignUp = {
    displayName: string;
    email: string;
    password: string;
  }
  
  const {register, handleSubmit, formState: { errors }} = useForm <SignUp>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const firebaseSignUpDoctor = async (values: Partial<User>) => {
    try{
      dispatch(createUser(values));
      navigate("/login");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
      <div className="loginContainerFull">
        <div className="loginContainer">
          <p className="title">Sign Up Doctor</p>
          <figure className="usersImg">
            <img src={usersImg} alt="" />
          </figure>
          <form
            className="formContainer"
            onSubmit={handleSubmit(firebaseSignUpDoctor)}
          >
            <label>
              Username:
              <input
                id="displayName"
                type={"displayName"}
                {...register("displayName")}
                required={true}
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "This field is required"
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
              />
            </label>
            <label>
              Email:
              <input
                id="email"
                type={"email"}
                {...register("email")}
                required={true}
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "This field is required"
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
              />
            </label>
            <label>
              Password:
              <input
                id="password"
                type={"password"}
                {...register("password")}
                required={true}
                onInvalid={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity(
                    "This field is required"
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
              />
            </label>
            <input className="btnSubmit" type={"submit"} value="Sign In!" />
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUpDoctor
