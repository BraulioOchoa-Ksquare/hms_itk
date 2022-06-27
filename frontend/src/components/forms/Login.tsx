import { useForm } from "react-hook-form";
import { firebaseConfig } from "../../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { loginSuccess, selectAuthStatus } from "../slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { getUsersProfile } from "../slices/profileSlice";
import { getProfilePatient } from "../slices/patientsSlice";
import { getProfileDoctor } from "../slices/doctorSlice";
import "./../../css/login.css";
import usersImg from "./../../images/users.png";
import { useState } from "react";

export const Login = () => {
  type Login = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const firebaseLogin = async () => {
    const email: any = document.getElementById("email");
    const password: any = document.getElementById("password");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const token = await user.user.getIdToken();
      const tokenResult = user.user.getIdTokenResult();
      console.log(tokenResult);
      let role: string = String((await tokenResult).claims.role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", JSON.stringify(role));
      if (role === "undefined") {
        role = "";
      }
      await dispatch(
        loginSuccess({
          access_token: token,
          uid: String(user.user.uid),
          email: String(user.user.email),
          role: role,
        })
      );
      await dispatch(getUsersProfile());
      if (role === "patient") {
        await dispatch(getProfilePatient());
      } else if (role === "doctor") {
        await dispatch(getProfileDoctor());
      }
      navigate("/");

      // localStorage.getItem("token");
      // console.log(user);
    } catch (error) {
      setErrorMessage("Email or password are not valid. Please try again");
    }
  };
  // const authStatus = useAppSelector(selectAuthStatus);
  const localUser = JSON.parse(String(localStorage.getItem("user")));
  const localToken = localUser._tokenResponse.idToken;
  const localUid = localUser.user.uid;
  const localEmail = localUser.user.email;
  const localRole = JSON.parse(String(localStorage.getItem("role")));
  window.onload = function () {
    dispatch(
      loginSuccess({
        access_token: localToken,
        uid: localUid,
        email: localEmail,
        role: localRole,
      })
    );
  };

  return (
    <>
      <div className="loginContainerFull">
        <div className="loginContainer">
          <p className="title">Sign In</p>
          <figure className="usersImg">
            <img src={usersImg} alt="" />
          </figure>
          <p id="error">{errorMessage}</p>
          <form
            className="formContainer"
            onSubmit={handleSubmit(firebaseLogin)}
          >
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
  );
};
