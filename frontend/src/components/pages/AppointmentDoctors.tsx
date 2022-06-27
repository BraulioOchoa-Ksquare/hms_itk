import * as React from "react";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import {
  doctorAppointments,
  selectAppointment,
  selectAppointmentsStatus,
} from "../slices/appointmentsSlice";
import { Col, Container, Row } from "react-bootstrap";
import { SideBar } from "../SideBar";
import "./../../css/appointmentslist.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const AppointmentsDoctors = () => {
  const dispatch = useAppDispatch();
  const appointmentDoctorStatus = useAppSelector(selectAppointmentsStatus);

  useEffect(() => {
    if (appointmentDoctorStatus === "idle") {
      dispatch(doctorAppointments());
    }
  }, [appointmentDoctorStatus, dispatch]);
  const appointmentDoctor = useAppSelector(selectAppointment);
  console.log(appointmentDoctor);
  appointmentDoctor.map((value) => {
    id: value.id;
    date: String(value.date);
    hour: value.hour;
    DoctorId: value.DoctorId;
    PatientId: value.PatientId;
    status: value.status;
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "hour",
      headerName: "Hour",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "DoctorId",
      headerName: "Doctor Id",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "PatientId",
      headerName: "Patient Id",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Appointment Status",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
    },
  ];

  return (
    <>
      <Container fluid className="containerFull">
        <Row>
          <Col lg="3" md="3" sx="3">
            <SideBar />
          </Col>
          <Col lg="9" md="9" sx="9" className="applistCont">
            <DataGrid
              sx={{ bgcolor: "#E3F5F3", border: 3 }}
              rows={appointmentDoctor}
              columns={columns}
              style={{ height: "500px" }}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
