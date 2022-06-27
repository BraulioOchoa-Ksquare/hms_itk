import * as React from "react";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import {
  getProfilePatient,
  selectPatient,
  selectPatientProfileDetails,
  selectPatientStatus,
} from "../slices/patientsSlice";
import { getUsersProfile } from "../slices/profileSlice";
import { SideBar } from "../SideBar";
import "./../../css/profile.css";
import { Col, Container, Row } from "react-bootstrap";

export const PatientProfileId = () => {
  const dispatch = useAppDispatch();
  const profilePatientStatus = useAppSelector(selectPatientStatus);

  useEffect(() => {
    if (profilePatientStatus === "idle") {
      dispatch(getUsersProfile());
      dispatch(getProfilePatient());
    }
  }, [profilePatientStatus, dispatch]);
  const profilePatientId = useAppSelector(selectPatientProfileDetails);

  return (
    <Container fluid className="containerFull">
      <Row>
        <Col lg="2" md="2" xs="2">
          <SideBar />
        </Col>
        <Col lg="10" md="10" xs="10" className="">
          <div className="profileContainer">
            <h1>Profile</h1>
            <div className="profileInfo">
              <div className="titles">
                <p>First Name:</p>
                <p>Last Name:</p>
                <p>Gender:</p>
                <p>Address:</p>
                <p>Phone Number:</p>
                <p>Birth Age:</p>
                <p>Age:</p>
              </div>
              <div>
                <p>{profilePatientId?.Profile.firstName}</p>
                <p>{profilePatientId?.Profile.lastName}</p>
                <p>{profilePatientId?.gender}</p>
                <p>{profilePatientId?.Profile.address}</p>
                <p>{profilePatientId?.Profile.phoneNumber}</p>
                <p>{profilePatientId?.birthDate}</p>
                <p>{profilePatientId?.age}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
