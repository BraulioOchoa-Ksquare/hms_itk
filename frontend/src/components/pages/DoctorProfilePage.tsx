import * as React from "react";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { getUsersProfile } from "../slices/profileSlice";
import usersImg from "./../../images/doctors-icon.png";
import {
  getProfileDoctor,
  selectDoctor,
  selectDoctorProfileDetails,
  selectDoctorStatus,
} from "../slices/doctorSlice";
import { SideBar } from "../SideBar";
import { Col, Container, Row } from "react-bootstrap";

export const DoctorProfile = () => {
  const dispatch = useAppDispatch();
  const profileDoctorStatus = useAppSelector(selectDoctorStatus);

  useEffect(() => {
    if (profileDoctorStatus === "idle") {
      dispatch(getUsersProfile());
      dispatch(getProfileDoctor());
    }
  }, [profileDoctorStatus, dispatch]);
  const profileDoctorId = useAppSelector(selectDoctorProfileDetails);

  return (
<>
<Container fluid className="containerFull">
      <Row>
        <Col lg="2">
          <SideBar />
        </Col>
        <Col lg="10" className="">
          <div className="profileContainer">
            <h1>Profile</h1>
            <figure className="docsImg">
            <img src={usersImg} alt="" />
          </figure>
            <div className="profileInfo">
              <div className="titles">
                <p>First Name:</p>
                <p>Last Name:</p>
                <p>Gender:</p>
                <p>Address:</p>
                <p>Phone Number:</p>
                <p>Professional License:</p>
                <p>Speciality:</p>
              </div>
              <div>
                <p>{profileDoctorId?.Profile.firstName}</p>
                <p>{profileDoctorId?.Profile.lastName}</p>
                <p>{profileDoctorId?.Profile.address}</p>
                <p>{profileDoctorId?.Profile.phoneNumber}</p>
                <p>{profileDoctorId?.professionalLicense}</p>
                <p>{profileDoctorId?.speciality}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
</>
  );
};
