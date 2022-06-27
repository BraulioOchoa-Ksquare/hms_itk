import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "./../css/sidebar.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { selectRole } from "./slices/authSlice";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import {
  FaUserCircle,
  FaClipboardList,
  FaPlusCircle,
  FaListAlt,
} from "react-icons/fa";
import { Appointments } from "./pages/Appointments";
import { PatientProfileId } from "./pages/PatientProfilePage";

// export const UserRole = () => {
//   let role = useAppSelector(selectRole);
//   if (role === "" || undefined) {
//     role = "admin";
//     return role;
//   } else {
//     return role;
//   }
// };

export const SideBar = () => {
  const role = useAppSelector(selectRole);
  return (
    <>
      {/* {role === "patient" && <div>Patient</div>}
      {role === "doctor" && <div>Doctor</div>}
      {role === "admin" && <div>Admin</div>} */}
      <ProSidebar className="sidebar-height">
        {/* <SidebarHeader>jeder</SidebarHeader> */}
        <SidebarContent>
          <Menu iconShape="square">
            <SubMenu title="Profile Info" icon={<FaUserCircle />}>
              {role === "patient" && (
                <MenuItem icon={<FaUserCircle />}>
                  Profile
                  <Link to="/patient/profile/" />
                </MenuItem>
              )}
              {role === "doctor" && (
                <MenuItem icon={<FaUserCircle />}>
                  Profile
                  <Link to="/doctor/profile/" />
                </MenuItem>
              )}
              {role === "patient" ||
                (role === "doctor" && (
                  <MenuItem icon={<FaPlusCircle />}>
                    Create Profile
                    <Link to="/profile" />
                  </MenuItem>
                ))}
              {role === "doctor" && (
                <MenuItem icon={<FaListAlt />}>
                  Add Professional Info
                  <Link to="/doctor/profile-form/" />
                </MenuItem>
              )}
              {role === "patient" && (
                <MenuItem icon={<FaListAlt />}>
                  Add your patient info
                  <Link to="/patient/profile-form/" />
                </MenuItem>
              )}
            </SubMenu>
            <SubMenu title="Appointments" icon={<FaClipboardList />}>
              {role === "patient" && (
                <MenuItem icon={<FaPlusCircle />}>
                  Create Appointments
                  <Link to="/appointment/" />
                </MenuItem>
              )}
              {role === "patient" && (
                <MenuItem icon={<FaListAlt />}>
                  View Appointments
                  <Link to="/appointment/patient/" />
                </MenuItem>
              )}
              {role === "doctor" && (
                <MenuItem icon={<FaListAlt />}>
                  View Appointments
                  <Link to="/appointment/doctor/" />
                </MenuItem>
              )}
              {role === "admin" && (
                <MenuItem icon={<FaListAlt />}>
                  View Appointments
                  <Link to="/appointment/admin/" />
                </MenuItem>
              )}
            </SubMenu>
            {role === "admin" && (
                <MenuItem icon={<FaUserCircle />}>
                  Create User Doctor
                  <Link to="/admin/userDoctor" />
                </MenuItem>
              )}
          </Menu>
        </SidebarContent>
        {/* <SidebarFooter>foorer</SidebarFooter> */}
      </ProSidebar>
    </>
  );
};
