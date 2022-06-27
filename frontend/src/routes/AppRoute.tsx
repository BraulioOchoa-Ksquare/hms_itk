import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "../components/forms/Login";
import { SignUp } from "../components/forms/SignUp";
import { Home } from "../components/home/Home";
import { Appointments } from "../components/pages/Appointments";
import { Profile } from "../components/forms/Profile";
import Patient from "../components/forms/PatientProfile";
import Doctor from "../components/forms/DoctorProfile";
import { ListProfiles } from "../components/pages/ListProfiles";
import { PatientProfileId } from "../components/pages/PatientProfilePage";
import RoutesProtected from "../routesProtected";
import NavBarComp from "../components/header";
import Dashboard from "../components/pages/Dashboard";
import { DoctorProfile } from "../components/pages/DoctorProfilePage";
import CreateAppointment from "../components/forms/CreateAppointment";
import { AppointmentsPatient } from "../components/pages/AppointmentPatient";
import { AppointmentsDoctors } from "../components/pages/AppointmentDoctors";
import SignUpDoctor from "../components/forms/SignUpDoctor";

export const AppRoute = () => {
  return (
    <BrowserRouter>
    <NavBarComp/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<RoutesProtected/>} />
        <Route path="/admin/userDoctor" element={<SignUpDoctor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/patient/profile-form" element={<Patient />} />
        <Route path="/doctor/profile-form/" element={<Doctor />} />
        <Route path="/profiles/list" element={<ListProfiles />} />

        {/* Rutas del sidebar en el dashboard */}
        <Route path="/patient/profile/" element={<PatientProfileId />} />
        <Route path="/doctor/profile/" element={<DoctorProfile />} />
        <Route path="/appointment/" element={<CreateAppointment />} />
        <Route path="/appointment/patient/" element={<AppointmentsPatient />} />
        <Route path="/appointment/doctor/" element={<AppointmentsDoctors />} />
        <Route path="/appointment/admin" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
};
