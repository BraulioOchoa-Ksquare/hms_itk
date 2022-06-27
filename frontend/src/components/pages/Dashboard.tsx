import React from "react";
import { useAppSelector } from "../../app/hook";
import { SideBar } from "../SideBar";
import { selectRole } from "../slices/authSlice";

const Dashboard = () => {
  const role = useAppSelector(selectRole);
  return (
    <div>
      {/* {role === "patient" && <div>Patient</div>}
      {role === "doctor" && <div>Doctor</div>}
      {role === "admin" && <div>Admin</div>} */}
      <SideBar />
      Dashboard
    </div>
  );
};

export default Dashboard;
